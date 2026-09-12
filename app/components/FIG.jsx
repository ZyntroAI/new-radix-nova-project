import React, { useState, useEffect, useCallback } from 'react';

// ⚙️ Configuration — สอดคล้องกับ FastAPI Boilerplate
const CONFIG = {
  API_BASE: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  TIMEOUT: 30000,
  RETRY_LIMIT: 3,
};

// 📋 Types
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  UNAUTHORIZED: 'unauthorized',
};

/**
 * FIG — FastAPI Integration Gateway Component
 * @param {string} endpoint - API path (เช่น "/api/v1/health")
 * @param {string} method - GET / POST / PUT / DELETE
 * @param {Object} payload - Body สำหรับ POST/PUT
 * @param {boolean} autoFetch - ดึงข้อมูลอัตโนมัติเมื่อ mount
 * @param {Function} onSuccess - Callback เมื่อสำเร็จ
 * @param {Function} onError - Callback เมื่อล้มเหลว
 * @param {Object} headers - Header เพิ่มเติม
 */
const FIG = ({
  endpoint,
  method = 'GET',
  payload = null,
  autoFetch = true,
  onSuccess,
  onError,
  headers = {},
  children,
}) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    status: STATUS.IDLE,
    statusCode: null,
  });

  // 🔑 ดึง Token จาก localStorage (ตรงกับ FastAPI Auth)
  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('zyntro_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };
  }, []);

  // 🚀 Core Fetch Function
  const fetchAPI = useCallback(async (body = null) => {
    setState(prev => ({ ...prev, status: STATUS.LOADING, error: null }));

    try {
      const res = await fetch(`${CONFIG.API_BASE}${endpoint}`, {
        method,
        headers: getAuthHeaders(),
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(CONFIG.TIMEOUT),
      });

      const statusCode = res.status;

      if (statusCode === 401) {
        throw Object.assign(new Error('Unauthorized'), { statusCode });
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw Object.assign(new Error(data.detail || 'API Error'), {
          statusCode,
          data,
        });
      }

      setState({
        data,
        error: null,
        status: STATUS.SUCCESS,
        statusCode,
      });

      onSuccess?.(data);
      return { data, error: null };

    } catch (err) {
      const errorState = {
        data: null,
        error: err.message || 'Unknown Error',
        status: err.statusCode === 401 ? STATUS.UNAUTHORIZED : STATUS.ERROR,
        statusCode: err.statusCode || 0,
      };
      setState(errorState);
      onError?.(errorState);
      return { data: null, error: errorState };
    }
  }, [endpoint, method, getAuthHeaders, onSuccess, onError]);

  // 🔄 Auto-Fetch
  useEffect(() => {
    if (autoFetch && method === 'GET') {
      fetchAPI();
    }
  }, [autoFetch, method, fetchAPI]);

  // ✅ Render Children with State
  return children({
    ...state,
    fetch: fetchAPI,
    isIdle: state.status === STATUS.IDLE,
    isLoading: state.status === STATUS.LOADING,
    isSuccess: state.status === STATUS.SUCCESS,
    isError: state.status === STATUS.ERROR,
    isUnauthorized: state.status === STATUS.UNAUTHORIZED,
  });
};

// ───────────────────────────────────────────────────────────
// 📦 Pre-Built Components — ใช้งานง่ายขึ้น
// ───────────────────────────────────────────────────────────

export const HealthCheck = ({ onReady }) => (
  <FIG endpoint="/api/v1/health" method="GET">
    {({ data, isLoading, isSuccess }) => (
      <div className="api-status">
        {isLoading && <span className="loading">🔄 Checking API...</span>}
        {isSuccess && (
          <span className="online">✅ API Online — {data?.timestamp || 'OK'}</span>
        )}
        {onReady && isSuccess && onReady(data)}
      </div>
    )}
  </FIG>
);

export const StatusBadge = ({ endpoint = '/api/v1/health' }) => (
  <FIG endpoint={endpoint} method="GET">
    {({ isLoading, isSuccess, isError, statusCode }) => (
      <span style={{
        padding: '4px 10px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 600,
        background: isSuccess ? '#10b98122' : isError ? '#ef444422' : '#6b728022',
        color: isSuccess ? '#10b981' : isError ? '#ef4444' : '#6b7280',
      }}>
        {isLoading ? '⏳ Checking...' :
         isSuccess ? `✅ ${statusCode || 200}` :
         isError ? `❌ ${statusCode || 'Error'}` : '—'}
      </span>
    )}
  </FIG>
);

// ───────────────────────────────────────────────────────────
// 📤 Export
// ───────────────────────────────────────────────────────────
export default FIG;
FIG.STATUS = STATUS;

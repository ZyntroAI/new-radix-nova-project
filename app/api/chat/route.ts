const { data } = await supabase.auth.getSession();
await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.session?.access_token}`,
  },
  body: JSON.stringify({ prompt }),
});

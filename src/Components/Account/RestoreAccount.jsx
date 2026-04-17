async function restoreAccount(userId) {
  return axios.patch(
    `http://sarahne.eu-4.evennode.com/user/restore-account/${userId}`,
    {},
    {
      headers: {
        accept: "*/*",
      },
    },
  );
}
const { mutate: restore, isPending } = useMutation({
  mutationFn: restoreAccount,
  onSuccess: () => {
    toast.success("Account restored successfully");
    navigate("/login");
  },
  onError: () => {
    toast.error("Failed to restore account");
  },
});
return (
  <>
    <Button onClick={() => restore(userId)}>Restore Account</Button>
  </>
);

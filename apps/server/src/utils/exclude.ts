export default function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const filteredEntries = Object.entries(user).filter(
    ([key]) => !keys.includes(key as Key)
  );

  return Object.fromEntries(filteredEntries) as Omit<User, Key>;
}

export const TEST_KEYS: Record<string, string[]> = {
  "kpop-chosengroup1": ["sa3hf7gub5", "6pmv14ezls", "0428"],
  "kpop-5generationtop": ["jkf1ua2giu", "8yxirmc9wq", "0428"]
};

export const verifyKey = (testId: string, key: string): boolean => {
  const validKeys = TEST_KEYS[testId];
  if (!validKeys) return false;
  return validKeys.includes(key.trim());
};

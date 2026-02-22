export const TEST_KEYS: Record<string, string[]> = {
  "kpop-chosengroup1": [
    "sa3hf7gub5", 
    "6pmv14ezls", 
    "0428"
  ],
  "kpop-5generationtop": [
    "jkf1ua2giu", 
    "8yxirmc9wq", 
    "0428"
  ]
};

export const verifyKey = (testId: string, inputKey: string): boolean => {
  const validKeys = TEST_KEYS[testId];
  if (!validKeys) {
    console.warn(`No keys found for testId: ${testId}`);
    return false;
  }
  
  const normalizedInput = inputKey.trim();
  console.log(`Verifying key for ${testId}: '${normalizedInput}'`);
  
  // Check exact match
  return validKeys.includes(normalizedInput);
};

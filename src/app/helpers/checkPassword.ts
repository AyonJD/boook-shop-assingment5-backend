import bcrypt from 'bcrypt'

const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  // Compare the provided password with the hashed password using bcrypt's compare function
  const passwordMatch = await bcrypt.compare(password, hashedPassword)

  return passwordMatch
}

export default checkPassword

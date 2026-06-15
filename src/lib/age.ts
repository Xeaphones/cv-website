/** 10 March 2003 */
export const BIRTH_DATE = new Date(2003, 2, 10);

export function calculateAge(birthDate: Date = BIRTH_DATE, now: Date = new Date()): number {
  let age = now.getFullYear() - birthDate.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());

  if (!hadBirthdayThisYear) {
    age--;
  }

  return age;
}

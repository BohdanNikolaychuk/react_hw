export default function toHoursAndMinutes(totalMinutes: number):string {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num:number) {
	return num.toString().padStart(2, '0');
}
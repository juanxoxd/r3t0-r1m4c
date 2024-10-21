import { format as tempo, addHour } from '@formkit/tempo';

export function formatDate(date: string | Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return tempo({
    date,
    format,
    tz: 'America/Lima',
  });
}

export function getToday(format = 'YYYY-MM-DD'): string {
  return formatDate(new Date(), format);
}

export function addBusinessDays(fecha: string | Date, days: number): string {
  const currentDate = new Date(fecha);
  let count = 0;

  while (count < days) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      count++;
    }
  }

  if (currentDate.getDay() === 6) {
    currentDate.setDate(currentDate.getDate() + 2);
  }
  if (currentDate.getDay() === 0) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return formatDate(currentDate, 'YYYY-MM-DD');
}

export function addDays(date: string | Date, days: number): string {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() + days);
  return formatDate(currentDate, 'YYYY-MM-DD');
}

export function subtractDays(date: string | Date, days: number): string {
  // Convertir la fecha a cadena si es un objeto Date
  const dateStr = typeof date === 'string' ? date : formatDate(date, 'YYYY-MM-DD');

  // Extraer año, mes y día de la cadena
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(5, 7);
  let day = parseInt(dateStr.slice(8, 10), 10);


  day -= days;

  if (day < 1) {
    throw new Error(
      'El día calculado es menor a 1, lo que significa que cruzaste al mes anterior.'
    );
  }

  const formattedDay = String(day).padStart(2, '0');

  return `${year}-${month}-${formattedDay}`;
}


export function addHours(date: string | Date, hours: number): string {
  const newDate = addHour(date, hours);
  return newDate.toISOString();
}

export function formatTimestamp(timestamp: number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const date = new Date(timestamp * 1000);
  return formatDate(date, format);
}

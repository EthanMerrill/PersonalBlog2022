interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

function timestampToDate(timestamp: Timestamp): Date {
    return new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
}

export function dateToFormattedString(timestamp: Timestamp): string {
    const date = timestampToDate(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    console.log(formattedDate);
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();

    return `${month}, ${year}`;
}

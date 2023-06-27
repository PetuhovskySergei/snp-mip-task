export default async function getClientList() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!res.ok) {
        throw new Error('Failed to fetch client list')
    }

    return res.json();
}

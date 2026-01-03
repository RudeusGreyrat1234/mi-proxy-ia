export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        try {
            const { mensaje, key } = JSON.parse(req.body);
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: mensaje }] }]
                })
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}

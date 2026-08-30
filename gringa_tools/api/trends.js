import googleTrends from 'google-trends-api';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: 'Keyword is required' });

  try {
    const data = await googleTrends.interestOverTime({
      keyword: keyword,
      geo: 'US',
      startTime: new Date(Date.now() - (90 * 24 * 60 * 60 * 1000)),
    });

    const parsedData = JSON.parse(data);
    const timelineData = parsedData.default.timelineData;

    if (!timelineData || timelineData.length === 0) {
      return res.status(200).json({ success: true, status: 'NOT_ENOUGH_DATA', message: 'Sem dados suficientes' });
    }

    const firstHalf = timelineData.slice(0, Math.floor(timelineData.length / 2));
    const secondHalf = timelineData.slice(Math.floor(timelineData.length / 2));

    const avgFirstHalf = firstHalf.reduce((acc, curr) => acc + curr.value[0], 0) / (firstHalf.length || 1);
    const avgSecondHalf = secondHalf.reduce((acc, curr) => acc + curr.value[0], 0) / (secondHalf.length || 1);

    let verdict = 'ESTÁVEL';
    if (avgSecondHalf > avgFirstHalf * 1.2) verdict = 'ALTA';
    else if (avgSecondHalf < avgFirstHalf * 0.8) verdict = 'QUEDA';

    res.status(200).json({ 
      success: true, 
      status: verdict, 
      avgFirstHalf, 
      avgSecondHalf,
      timeline: timelineData.map(d => ({ date: d.formattedTime, value: d.value[0] }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

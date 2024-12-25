export const getTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  const units = [
    { label: '년', seconds: 60 * 60 * 24 * 365 }, // 1 year
    { label: '달', seconds: 60 * 60 * 24 * 30 }, // 1 month
    { label: '일', seconds: 60 * 60 * 24 },       // 1 day
    { label: '시간', seconds: 60 * 60 },            // 1 hour
    { label: '분', seconds: 60 },                 // 1 minute
  ];

  for (const unit of units) {
    if (diffInSeconds >= unit.seconds) {
      const value = Math.floor(diffInSeconds / unit.seconds);
      return `${value}${unit.label} 전`;
    }
  }

  return '방금 전';
};

export const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  
  return `${yyyy}-${mm}-${dd}`;
};


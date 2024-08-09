export const formatBlogDate = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now - createdDate;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return createdDate.toLocaleDateString('es-ES', options);
  }
};

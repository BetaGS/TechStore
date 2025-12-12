import './SkeletonCard.css';

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-short"></div>
        <div className="skeleton-line skeleton-line-medium"></div>
        <div className="skeleton-line skeleton-line-short"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;


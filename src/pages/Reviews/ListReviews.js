const ListReviews = ({ reviews }) => {
  return (
    <ul>
      {reviews.map(({ author, content }) => (
        <li key={author}>
          <h4>Author: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default ListReviews;

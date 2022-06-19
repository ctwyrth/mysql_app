import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ movieName, setMovieName ] = useState("");
  const [ review, setReview ] = useState("");
  const [ movieReviewList, setMovieReviewList ] = useState([]);
  const [ refresh, setRefresh ] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setMovieReviewList(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [refresh]);

  const submitReview = () => {
    axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      review: review
    })
      .then(res => {
        console.log("We have arived!");
        setMovieName("");
        setReview("");
        setRefresh(refresh++);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="App">
      <h1>MySQL CRUD APP</h1>
      <div className='form'>
        <label htmlFor="movieName">Movie Name:</label>
        <input type="text" name="movieName" id="" onChange={(e) => { setMovieName(e.target.value) }} value={movieName} />
        <label htmlFor="review">Review:</label>
        <input type="text" name="review" id="" onChange={(e) => { setReview(e.target.value) }} value={review} />
        <button onClick={ submitReview }>Submit</button>
      </div>
      <div className='reviews'>
        {movieReviewList && movieReviewList.map((review) => {
          return (
            <div key={review.id}>
              <h4>{review.movieName}</h4>
              <p>{review.review}</p>
              <hr />
            </div>
          )}
        )}
      </div>
    </div>
  );
}

export default App;

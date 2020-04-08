# 5.2.1 Redux async

---

Now that you've seen redux, hopefully this pattern looks familiar:

```js
const App = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(someAction());
  };

  return <button onClick={handleClick}>Do something</button>;
};
```

---

# A new scenario

I need to request some data from the server.

I want to show a spinner while it's fetching

---

Let's solve this together

```js
// My actions:
const startRequestingData = () => ({
  type: 'START_REQUESTING_DATA',
});

const receiveData = (data) => ({
  type: 'RECEIVE_DATA',
  data,
});

const failToRetrieveData = (err) => ({
  type: 'FAIL_TO_RETRIEVE_DATA',
  err,
});

const App = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    //dispatch(startRequestingData())
    fetch('/some-data')
      .then((res) => res.json())
      .then((data) => {})//dispatch(receiveData(data))
      .catch((err) => {});//dispatch(failToRetrieveData(err))
  };

  return <button onClick={handleClick}>Do something</button>;
};
```

---

# Exercises

Dispatch the actions

---

```js
const receiveHockeyScores = (scores) => ({
  type: 'RECEIVE_HOCKEY_SCORES',
  scores,
});
const receiveBaseballScores = (scores) => ({
  type: 'RECEIVE_BASEBALL_SCORES',
  scores,
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch('/hockey')
      .then((res) => res.json())
      .then((scores) => {
        dispatch(receiveHockeyScores(scores)) //
      });

    fetch('/baseball')
      .then((res) => res.json())
      .then((scores) => {
        dispatch(receiveBaseballScores(scores)) //
      });
  }, []);

  return <Scores />;
};
```

---

# Extra Challenge

Update this example so that it dispatches an action when _both_ of the endpoints have completed

---

```js
const receiveAllScores = () => ({
  type: 'RECEIVE_ALL_SCORES',
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Dispatch `receiveAllScores` after BOTH fetches have completed

    fetch('/hockey')
      .then(res=>res.json())
      .then((scores) => {
        dispatch(receiveHockeyScores(scores));
      });

    fetch('/baseball')
      .then(res=>res.json())
      .then((scores) => {
        dispatch(receiveBaseballScores(scores));
      });
  }, []);

  return <Scores />;
};
////// best not do this
React.useEffect(() => {
    // Dispatch `receiveAllScores` after BOTH fetches have completed

    fetch('/hockey')
      .then(res=>res.json())
      .then((scores1) => {
        dispatch(receiveHockeyScores(scores1));
      })
      .then(
        fetch('/baseball')
        .then(res=>res.json())
        .then((scores2) => {
        dispatch(receiveBaseballScores(scores2));
        })
      )
      .then(dispatch(receiveAllScores(scores1, scores2)))
  }, []);

  return <Scores />;
};
////// this viable
React.useEffect(() => {
    // Dispatch `receiveAllScores` after BOTH fetches have completed
  let numOfCompletedRequests = 0;
    fetch('/hockey')
      .then(res=>res.json())
      .then((scores1) => {
        dispatch(receiveHockeyScores(scores1));
        numOfCompletedRequests ++;
        if(numOfCompletedRequests === 2){dispatch(receiveAllScores())};
      })
    fetch('/baseball')
      .then(res=>res.json())
      .then((scores2) => {
        dispatch(receiveBaseballScores(scores2));
        numOfCompletedRequests ++;
        if(numOfCompletedRequests === 2){dispatch(receiveAllScores())};
      })
  }, []);

  return <Scores />;
};

////// this viable
React.useEffect(() => {
    // Dispatch `receiveAllScores` after BOTH fetches have completed
  let numOfCompletedRequests = 0;

  const hockeyPromise = fetch('/hockey')
    .then(res=>res.json())
    .then((scores1) => {
      dispatch(receiveHockeyScores(scores1));
    });

  const baseballPromise = fetch('/baseball')
    .then(res=>res.json())
    .then((scores2) => {
      dispatch(receiveBaseballScores(scores2));
    });

  Promise.all([hockeyPromes, baseballPromise])
    .then(()=>dispatch(receiveAllScores()))
    .catch(err=> console.log('error', er))

  }, []);

  return <Scores />;
};
/////////////////////////// or async
const receiveAllScores = ({scores}) => ({
  type: 'RECEIVE_ALL_SCORES',
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(async () => {
    // Dispatch `receiveAllScores` after BOTH fetches have completed

    const hockeyRes = await fetch('/hockey');
    const hockeyScores = await hockeyRes.json();
    const baseballRes = await fetch('/baseball');
    const baseballScores = await hockeyRes.json();

    await dispatch(receiveAllScores({hockeyScores, baseballScores})
  }, []);

  return <Scores />;



```

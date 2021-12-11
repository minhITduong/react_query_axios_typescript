import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import Tutorial from "./types/Tutorial";
import TutorialService from "./services/TutorialService";

const App: React.FC = () => {
  const [getId, setGetId] = useState("");
  const [getTitle, setGetTitle] = useState("");

  const [getResult, setGetResult] = useState<string | null>(null);

  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery<
    Tutorial[],
    Error
  >(
    "query-tutorials",
    async () => {
      return await TutorialService.findAll();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setGetResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingTutorials) setGetResult("loading...");
  }, [isLoadingTutorials]);

  function getAllData() {
    try {
      getAllTutorials();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }

  const { isLoading: isLoadingTutorial, refetch: getTutorialById } = useQuery<
    Tutorial,
    Error
  >(
    "query-tutorial-by-id",
    async () => {
      return await TutorialService.findById(getId);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        setGetResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingTutorial) setGetResult("loading...");
  }, [isLoadingTutorial]);

  function getDataById() {
    if (getId) {
      try {
        getTutorialById();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const { isLoading: isSearchingTutorial, refetch: findTutorialsByTitle } =
    useQuery<Tutorial[], Error>(
      "query-tutorials-by-title", // ["query-tutorials-by-title", getTitle],
      async () => {
        return await TutorialService.findByTitle(getTitle);
      },
      {
        enabled: false,
        retry: 1,
        onSuccess: (res) => {
          setGetResult(fortmatResponse(res));
        },
        onError: (err: any) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      }
    );

  useEffect(() => {
    if (isSearchingTutorial) setGetResult("searching...");
  }, [isSearchingTutorial]);

  function getDataByTitle() {
    if (getTitle) {
      try {
        findTutorialsByTitle();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

  return (
    <div id="app" className="container">
      <div className="card">
        <div className="card-header">
          React Query Axios Typescript GET - BezKoder.com
        </div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>
              Get All
            </button>

            <input
              type="text"
              value={getId}
              onChange={(e) => setGetId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>
                Get by Id
              </button>
            </div>

            <input
              type="text"
              value={getTitle}
              onChange={(e) => setGetTitle(e.target.value)}
              className="form-control ml-2"
              placeholder="Title"
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-primary"
                onClick={getDataByTitle}
              >
                Find By Title
              </button>
            </div>

            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearGetOutput}
            >
              Clear
            </button>
          </div>

          {getResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{getResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

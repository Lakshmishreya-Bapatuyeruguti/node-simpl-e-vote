import { React, useContext, useEffect } from 'react';
import CandidateList from './CandidateList';
import { AppContext } from '../App';
import votingpic from '../pics/voting.png';
import contractInstance from '../contractInstance';
function CandidatesResultList(props) {
  const { candidatesInfoList, currentOrganizer, setCandidatesInfoList } =
    useContext(AppContext);

  useEffect(() => {
    // Showing Results Of Particular Election
    async function showCandidatesResults() {
      try {
        const { signerAddress } = await contractInstance();

        const organizerIdSelected = localStorage.getItem('current organizerId');
        setCandidatesInfoList([]);
        localStorage.setItem('highest', 0);

        localStorage.setItem('connected address', signerAddress);
        const token = localStorage.getItem('token');
        const requestHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `http://localhost:5000/api/showCandidates/${organizerIdSelected}`,
          {
            method: 'GET',
            headers: requestHeaders,
          },
        );
        const data = await response.json();
        setCandidatesInfoList(data.candidates);
        console.log('.......', data.candidates);
        if (response.ok) {
          return;
        } else {
          const errorData = await response.json();
          console.log('Error:', errorData);
        }
      } catch (error) {
        console.log('Err at showCandidatesDetails()', error);
      }
    }
    showCandidatesResults();
  }, [setCandidatesInfoList]);

  return (
    <div className=" w-5/6 ml-10 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
          {props.greeting}
        </h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          {props.instruction}
        </p>
      </div>
      {candidatesInfoList.map((candidate, key) => {
        let highest = localStorage.getItem('highest');
        if (candidate.votes >= highest) {
          localStorage.setItem('highest', candidate.votes);
        }
        return (
          <div className="flex w-full" key={key}>
            <CandidateList
              name={candidate.name}
              address={candidate.candidateAddress}
              party={candidate.partyName}
              votes={candidate.votes}
              results={props.results}
              organizer={currentOrganizer}
              isWinner={
                /* eslint-disable-next-line eqeqeq*/
                localStorage.getItem('highest') == candidate.votes ? 'Y' : 'N'
              }
            />
            <img
              src={votingpic}
              alt="voting pic"
              className="  object-fill  h-20 ml-40  mt-12 "
              key={`${key}-img`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CandidatesResultList;

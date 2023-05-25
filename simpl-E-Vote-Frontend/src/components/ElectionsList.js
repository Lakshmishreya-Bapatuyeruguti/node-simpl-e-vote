import { React, useContext, useEffect, useState } from 'react';
import ElectionList from './ElectionList';
import { AppContext } from '../App';
import voterpic from '../pics/voterpic.png';
import Loading from './Loading';
import contractInstance from '../contractInstance';
function ElectionsList() {
  const { connectedAccount, setIsLoading, setConnectedAccount } =
    useContext(AppContext);
  const { isLoading } = useContext(AppContext);
  const [electionList, setElectionList] = useState([]);
  useEffect(() => {
    // Displaying Organizers of Particular Network
    async function displayOrganizers() {
      try {
        const { networkId, signerAddress } = await contractInstance();
        setIsLoading(true);
        setConnectedAccount(signerAddress);
        localStorage.setItem('connected address', signerAddress);
        let networkname = '';
        console.log(networkId, '...........');
        if (networkId === 11155111) {
          networkname = 'Sepolia';
          console.log('sepolia');
        } else {
          networkname = 'Mumbai';
          console.log('Mumbai');
        }
        const token = localStorage.getItem('token');
        const requestHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        console.log(networkname, '.....nnnn');

        const response = await fetch(
          `http://localhost:5000/api/showElections/${networkname}`,
          {
            method: 'GET',
            headers: requestHeaders,
          },
        );
        const data = await response.json();
        setElectionList(data.elections);
        console.log('.......', electionList);
        if (response.ok) {
          return setIsLoading(false);
        } else {
          const errorData = await response.json();
          console.log('Error:', errorData);
        }
      } catch (error) {
        console.log('Err at displayOrganizers()', error);
      }
    }
    displayOrganizers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" w-5/6 ml-10  ">
      {isLoading && electionList.length > 0 ? (
        <Loading />
      ) : (
        <div>
          <div className="  mt-2 ">
            <h1 className="text-4xl font-sans mt-10 ml-20 intro">
              Hello Voter
            </h1>
            <p className="text-1xl font-sans mt-2 ml-20 intro">
              Start Voting in the listed elections that are active
            </p>
          </div>
          {electionList.map((election, key) => {
            if (election.organizerAddress !== connectedAccount) {
              return (
                <div className="flex w-full">
                  <img
                    src={voterpic}
                    alt="candidatesdemopic"
                    className=" object-fill  h-20 mt-12  ml-36 "
                    key={`${key}-img`}
                  />
                  <ElectionList
                    key={key}
                    id={election.id}
                    organizer={election.organizerAddress}
                    started={election.electionStarted}
                    ended={election.electionEnded}
                    networkName={election.networkName}
                    default="false"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default ElectionsList;

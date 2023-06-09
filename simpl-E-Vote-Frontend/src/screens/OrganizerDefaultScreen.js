import { React, useContext, useEffect, useState } from 'react';
import organizerpic from '../pics/organizer.png';
import Button from '../components/Button';
import Login from '../components/Login';
import { AppContext } from '../App';
import ElectionList from '../components/ElectionList';
import Loading from '../components/Loading';
import contractInstance from '../contractInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function OrganizerDefaultScreen() {
  const { connectedAccount, setConnectedAccount, setIsLoading, isLoading } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [electionList, setElectionList] = useState([]);
  let organizerFound = false;
  let count = 1;

  useEffect(() => {
    //  Displaying Organizers of Particular Network
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
        console.log(response.status, 'org show elections STATUS');
        if (response.status === 201) {
          setIsLoading(false);
          return;
        } else {
          const errorData = await response.json();
          console.log('Error:', errorData);
        }
      } catch (error) {
        toast.error('Session Expired. Kindly Login Again', {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate('/');
        }, 4000);
        console.log('Err at displayOrganizers()', error);
      }
    }
    displayOrganizers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Login />
      {isLoading && electionList && electionList.length > 0 ? (
        <Loading />
      ) : (
        <div className="flex w-full mb-32">
          <div className=" mt-24  w-full ">
            {electionList &&
              electionList.length > 0 &&
              electionList.map((election, key) => {
                if (election.organizerAddress === connectedAccount) {
                  organizerFound = true;
                  if (key >= 0 && count === 1) {
                    count += 1;
                    return (
                      <div className="w-5/6" key={key}>
                        <div className="  mt-2 ">
                          <h1 className="text-4xl font-sans mt-10 ml-20 intro">
                            Hello Organiser
                          </h1>
                          <p className="text-1xl font-sans mt-2 ml-20 intro">
                            Below are your elections. Results can be seen once
                            election is ended
                          </p>
                        </div>
                        <div className=" m-auto flex">
                          <img
                            src={organizerpic}
                            alt="organizer pic"
                            className="  object-fill  h-20 mt-12 ml-32"
                          />
                          <ElectionList
                            id={election.id}
                            key={key}
                            organizer={election.organizerAddress}
                            started={election.electionStarted}
                            ended={election.electionEnded}
                            default="true"
                            networkName={election.networkName}
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="w-5/6 " key={key}>
                      <div className=" m-auto flex w-full">
                        <img
                          src={organizerpic}
                          alt="organizer pic"
                          className="  object-fill  h-20 mt-12 ml-32 "
                        />
                        <ElectionList
                          id={election.id}
                          organizer={election.organizerAddress}
                          started={election.electionStarted}
                          ended={election.electionEnded}
                          default="true"
                          networkName={election.networkName}
                          key={key}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            {!organizerFound && (
              <div>
                <div className=" w-1/2  px-4 m-auto  rounded-full shadow-md shadow-slate-300 text-center ">
                  <h1 className="text-4xl font-sans mt-10  intro py-4">
                    Hello <span className="text-blue-900">Organiser</span>
                  </h1>
                  <img
                    src={organizerpic}
                    alt="organizer pic"
                    className="  object-fill m-auto h-40 mt-2 "
                  />
                  <h1 className=" py-6 font-sans font-semibold intro text-3xl text-yellow-500">
                    You have no elections scheduled yet....!!!
                  </h1>
                  <h1 className="  font-sans font-light intro text-2xl text-gray-400">
                    Join as organizer and start the election process
                  </h1>
                  <div className="pb-4">
                    <Button
                      content={'Start New Election'}
                      path="/organizerdefault/addcandidates"
                      asorganizer="true"
                      color="yellow"
                    />
                  </div>
                </div>
              </div>
            )}
            {organizerFound && (
              <div className="w-full m-auto text-center ">
                <Button
                  content={'Organize New Election'}
                  path="/organizerdefault/addcandidates"
                  asorganizer="true"
                  color="yellow"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizerDefaultScreen;

import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import contractInstance from '../contractInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Button(props) {
  const {
    connectedAccount,
    setConnectedAccount,
    name,
    age,
    address,
    candidateParty,
  } = useContext(AppContext);
  const navigate = useNavigate();

  // Function To navigate
  function navigateTo() {
    try {
      navigate(props.path);
    } catch (error) {
      console.log('Err at navigateTo()', error);
    }
  }

  // Function To add Organizer
  async function addOrganizer() {
    try {
      const { contract, networkId, signerAddress } = await contractInstance();

      const token = localStorage.getItem('token');
      const requestBody = {
        organizerAddress: signerAddress,
        electionStarted: false,
        electionEnded: false,
        networkName: networkId === 11155111 ? 'Sepolia' : 'Mumbai',
      };
      const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch('http://localhost:5000/api/addElection', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      console.log(response.status, 'ADD ORG STATUS');
      if (response.status === 201) {
        console.log('Data added');
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
      let data = await response.json();
      console.log(data.electionCount);
      const addOrgTx = await contract.addOrganizer(
        signerAddress,
        data.electionCount,
      );
      localStorage.setItem('orgId', data.electionCount);
      setConnectedAccount(signerAddress);
      localStorage.setItem('connected address', connectedAccount);

      toast.info(
        'You will soon be added as organizer. Kindly Wait till confirmation..!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );

      await addOrgTx.wait();
      navigateTo();
    } catch (error) {
      console.log('Err at addOrganizer()', error);
    }
  }

  // Adding Candidates to Particular Organizer's Election
  async function addCandidate() {
    try {
      const { contract } = await contractInstance();
      const organizerConnected = localStorage.getItem('connected address');

      let orgId = localStorage.getItem('orgId');
      if (!name || !age || !candidateParty || !address) {
        return toast.error('Kindly fill all details!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.log(
        name,
        age,
        candidateParty,
        address,
        organizerConnected,
        orgId,
      );
      const addCandidateTx = await contract.setCandidate(
        name,
        age,
        candidateParty,
        address,
        organizerConnected,
        orgId,
      );
      toast.info(
        'We are adding Candidate , Kindly Wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await addCandidateTx.wait();

      const token = localStorage.getItem('token');
      const requestBody = {
        name,
        candidateAddress: address,
        partyName: candidateParty,
        connectedAddress: organizerConnected,
      };
      const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch('http://localhost:5000/api/addCandidate', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      console.log(response.status, 'ADD CANDIDATE STATUS');
      if (response.status === 201) {
        toast.success('Candidate Added Successfully....!', {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        return;
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      toast.error('Candidate already exists in same election....!!', {
        position: toast.POSITION.TOP_CENTER,
      });

      console.log('Err at add Candidate()', error);
    }
  }

  // Election Start
  async function electionBegins() {
    try {
      const { contract } = await contractInstance();
      const organizerConnected = localStorage.getItem('connected address');
      let orgId = localStorage.getItem('orgId');

      const startElectionTx = await contract.startVoting(
        organizerConnected,
        orgId,
      );
      toast.info(
        'Election is being started, Kindly Wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await startElectionTx.wait();
      const token = localStorage.getItem('token');
      const requestBody = {
        connectedAddress: organizerConnected,
      };
      const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch('http://localhost:5000/api/startElection', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      console.log(response.status, 'ELECTION START STATUS');
      if (response.status === 201) {
        navigateTo();
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      console.log('Err at electionBegins()', error);
    }
  }

  // Consume token
  async function consumeToken() {
    try {
      const { signerAddress } = await contractInstance();

      const requestBody = {
        connectedAccount: signerAddress,
      };
      console.log('Req Body', requestBody);
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response.status, 'LOGIN  STATUS');
      if (response.status === 201) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      console.log('Error at consumeToken():', error);
    }
  }

  return (
    <>
      <ToastContainer />
      <button
        className={`rounded-none bg-${props.color}-300 h-16 w-60 text-2xl mt-10 ml-16 mr-12 text-center shadow-md shadow-yellow-400 font-serif hover:bg-yellow-200 `}
        onClick={async () => {
          if (props.voterlogin === 'true') {
            await consumeToken();
            navigateTo();
          }
          if (props.organizerlogin === 'true') {
            await consumeToken();
            navigateTo();
          }
          if (props.asorganizer === 'true') {
            addOrganizer();
          }
          if (props.addcandidate === 'true') {
            addCandidate();
          }
          if (props.confirmstart === 'true') {
            electionBegins();
          }
        }}
      >
        {props.content}
      </button>
    </>
  );
}

export default Button;

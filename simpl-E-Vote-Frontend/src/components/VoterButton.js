import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import contractInstance from '../contractInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VoterButton(props) {
  const navigate = useNavigate();
  const {
    connectedAccount,
    setCurrentOrganizer,
    currentOrganizer,
    currentOrganizerId,
    setCurrentOrganizerId,
  } = useContext(AppContext);

  //  Navigate Function
  function navigateTo() {
    navigate(props.path);
  }

  // Voter adding vote  to partcular candidate
  async function addVote() {
    try {
      const { contract } = await contractInstance();
      const orgId = localStorage.getItem('current organizerId');
      console.log(props.candidate, currentOrganizer, connectedAccount, orgId);

      const voteToTx = await contract.voteTo(
        props.candidate,
        currentOrganizer,
        connectedAccount,
        orgId,
      );
      toast.info(
        'Your vote is being added. Kindly wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await voteToTx.wait();
      //API To update the vote in candidate db of particular candidate
      const token = localStorage.getItem('token');
      const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `http://localhost:5000/api/addVote/${props.candidate}`,
        {
          method: 'PUT',
          headers: requestHeaders,
        },
      );
      if (response.ok) {
        navigateTo();
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (err) {
      console.log('ERROR at addVote()', err);
      toast.error('You are not allowed to vote', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  // Election End
  async function electionEnds() {
    try {
      const { contract } = await contractInstance();
      console.log(currentOrganizerId);
      const endElectionTx = await contract.endVoting(
        connectedAccount,
        currentOrganizerId,
      );
      toast.info(
        'We are ending your election. Kindly wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await endElectionTx.wait();
      toast.success('Your election is ended...!', {
        position: toast.POSITION.TOP_CENTER,
      });
      const token = localStorage.getItem('token');
      const requestBody = {
        connectedAddress: connectedAccount,
      };
      const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `http://localhost:5000/api/endElection/${currentOrganizerId}`,
        {
          method: 'PUT',
          headers: requestHeaders,
          body: JSON.stringify(requestBody),
        },
      );
      if (response.ok) {
        navigateTo();
        window.location.reload();
        return;
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log('electionEnds()', error);
    }
  }

  return (
    <div>
      <button
        className={`rounded-lg ${props.color} h-12 w-40 text-2xl mt-4  text-center shadow-md shadow-gray-500 font-serif 2xl:h-10 2xl:w-30 ${props.colorhover} ${props.textcolor}`}
        onClick={() => {
          if (props.showcandidatelist === 'true') {
            setCurrentOrganizerId(props.id);
            setCurrentOrganizer(props.organizer);
            localStorage.setItem('current organizer', props.organizer);
            localStorage.setItem('current organizerId', props.id);
            navigateTo();
          }
          if (props.vote === 'true') {
            setCurrentOrganizerId(props.id);
            addVote();
          }
          if (props.results === 'true') {
            setCurrentOrganizerId(props.id);
            setCurrentOrganizer(props.organizer);
            localStorage.setItem('current organizer', props.organizer);
            localStorage.setItem('current organizerId', props.id);

            navigateTo();
          }
          if (props.electionends === 'true') {
            setCurrentOrganizerId(props.id);
            electionEnds();
          }
        }}
      >
        {props.content}
      </button>
      <ToastContainer />
    </div>
  );
}

export default VoterButton;

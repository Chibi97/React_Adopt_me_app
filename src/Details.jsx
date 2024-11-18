import React from "react";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./queries/fetchPet";
import Carousel from "./class-components/Carousel";
import ErrorBoundary from "./utilities/ErrorBoundary";
import Error from "./utilities/Error";
import Modal from "./utilities/Modal";
import AdoptedPetContext from "./utilities/adoptedPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); //# programmatic navigation
  const [_adoptedPet, setAdoptedPet] = useContext(AdoptedPetContext); // pulling the data from the Provider

  /**
   *  We are searching for a "details" key with the id as a second parameter
   * If query does not find that key in the cache, it will use `fetchPet` to fetch the data
   *
   * We are treating it like a synchronous hook even though it fetches data asynchronousl
   *
   *! To post or put some data, we would use `useMutation` instead of `useQuery`
   */
  const { id } = useParams(); //# useParams is a hook that returns an object of key/value pairs of URL parameters
  const result = useQuery(["details", id], fetchPet);

  // It will try to fetch 3 more times before it gives us  "isError = true"
  if (result.isError) {
    return <h1>Something went wrong!</h1>;
  }

  // We cannot await a render function! So we use the `isLoading` property to check if the data is still loading
  if (result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  // If we reach this code, we have a pet
  const pet = result.data.pets[0];

  return (
    // If we wanted we could catch the event that's bubbled up here and do: onClick={() => alert("hi")}
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal && (
            <Modal>
              {/* In virtual DOM, we render this inside of a Details component, but on the actual DOM, through portal it's outside the div id="root" */}
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      // setShowModal(false);
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary errorComponent={Error()}>
      <Details {...props} />
      {/* We don't have props on Details, but we don't care about it from here, we just need to pass them */}
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;

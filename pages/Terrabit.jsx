import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const datas = [
  { id: 2, type: 'TEXT', name: 'Your Name' },
  { id: 3, type: 'TEXT', name: 'Email' },
  { id: 4, type: 'TEXTAREA', name: 'Description' },
];

const Terrabit = () => {
  const [state, setState] = useState({});
  const [error, setError] = useState({});
  const [answer, setAnswer] = useState({});
  const [showTerra, setShowTerra] = useState(false);
  const router = useRouter();

  const handleCloseTerra = () => {
    setShowTerra(false);
  };
  const handleConfirmation = (e) => {
    e.preventDefault();
    console.log(state);
    console.log(error);
    let unFilled = 0;
    datas.forEach((item) => {
      if (typeof state[item.id] === 'string' && state[item.id] !== '') {
        setError((nextState) => ({
          ...nextState,
          [item.id]: '',
        }));
      } else {
        unFilled += 1;
        setError((nextState) => ({
          ...nextState,
          [item.id]: 'Please Filled This Form',
        }));
      }
    });
    if (unFilled === 0) {
      setShowTerra(true);
    }
  };
  const handleState = (e) => {
    const { name, type, value } = e.target;
    if (type == 'text') {
      setState((nextState) => ({
        ...nextState,
        [name]: value,
      }));
    } else if (type == 'textarea') {
      setState((nextState) => ({
        ...nextState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const masterRegEx = /^55[0-9]{14}$/;
    const amexRegEx = /^3[47][0-9]{13}$/;

    if (state[1].toString() === '-1') {
      router.push('/');
    } else if (visaRegEx.test(state[1])) {
      setAnswer((nextState) => ({
        ...nextState,
        1: 'Card Type is VISA',
      }));
      setError((nextState) => ({
        ...nextState,
        1: '',
      }));
    } else if (masterRegEx.test(state[1])) {
      setAnswer((nextState) => ({
        ...nextState,
        1: 'Card Type is MASTER',
      }));
      setError((nextState) => ({
        ...nextState,
        1: '',
      }));
    } else if (amexRegEx.test(state[1])) {
      setAnswer((nextState) => ({
        ...nextState,
        1: 'Card Type is AMEX',
      }));
      setError((nextState) => ({
        ...nextState,
        1: '',
      }));
    } else {
      setError((nextState) => ({
        ...nextState,
        1: 'Please Try Again',
      }));
      setAnswer((nextState) => ({
        ...nextState,
        1: '',
      }));
    }
  };

  return (
    <>
      <div className="terra-container">
        <h1 className="terra-header">TERRABIT TEST</h1>
        <h1 className="terra-header">1.</h1>
        <form
          className="terra-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="terra-input-text"
            id="1"
            name="1"
            onChange={(e) => {
              handleState(e);
            }}
            type="text"
          ></input>
          {error.hasOwnProperty(1) && <label className="error-msg">{error['1']}</label>}
          {answer.hasOwnProperty(1) && <label className="answer-msg">{answer['1']}</label>}

          <div>
            <button className="terra-btn">Submit</button>
          </div>
        </form>
      </div>

      <div className="terra-container">
        <h1 className="terra-header">2.</h1>
        <form
          className="terra-form"
          onSubmit={(e) => {
            handleConfirmation(e);
          }}
        >
          {datas.map((item) => {
            if (item.type === 'TEXTAREA') {
              return (
                <>
                  <div className="terra-wrapper">
                    <p>{item.name} :</p>
                    <textarea
                      className="terra-input-text"
                      id={item.id}
                      name={item.id}
                      onChange={(e) => {
                        handleState(e);
                      }}
                    ></textarea>
                    <div />
                    <div>{error.hasOwnProperty(item.id) && <label className="error-msg flex">{error[item.id]}</label>}</div>
                  </div>
                </>
              );
            } else if (item.type == 'TEXT') {
              return (
                <>
                  <div className="terra-wrapper">
                    <p>{item.name} :</p>
                    <input
                      className="terra-input-text"
                      id={item.id}
                      name={item.id}
                      onChange={(e) => {
                        handleState(e);
                      }}
                      type={item.type}
                    ></input>
                    <div />
                    <div>{error.hasOwnProperty(item.id) && <label className="error-msg flex">{error[item.id]}</label>}</div>
                  </div>
                </>
              );
            }
          })}

          <div>
            <button className="terra-btn">Submit</button>
          </div>
        </form>
      </div>
      <Modal className="terra-modal" show={showTerra} onHide={() => handleCloseTerra()} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="header-modal">Confirmation</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {datas.length != 0 &&
            datas.map((item) => (
              <div key={item.id} className="wrapper-modal">
                <p className="name-modal">{item.name} :</p>
                {state[item.id] != undefined && <p className="name-modal">{state[item.id]}</p>}
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button className="btn-modal" onClick={() => {}}>
              Confirm
            </button>
            <button
              className="btn-modal btn-gray"
              onClick={() => {
                handleCloseTerra();
              }}
            >
              Back
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Terrabit;

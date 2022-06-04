import Pages from 'layout/pageMain';
import React, { useState } from 'react';
import { questions } from 'services/data';

const ExampleForm = (props) => {
  const [state, setState] = useState({});
  const [imagePreview, setImagePreview] = useState({});
  const [errors, setErrors] = useState({});
  const [stateS, setStateS] = useState({ loading: false });
  console.log('errors: ', errors);
  console.log('state: ', state);
  const handlerChange = (e, questions) => {
    const { name, value, checked, files } = e.target;
    if (e.target.type == 'file') {
      const objectUrl = URL.createObjectURL(files[0]);
      setImagePreview((nextState) => ({ ...nextState, [name]: objectUrl }));
      setState((nextState) => ({
        ...nextState,
        [name]: files[0],
      }));
      setErrors((nextState) => ({
        ...nextState,
        [name]: '',
      }));
    } else if (e.target.type == 'checkbox') {
      setState((nextState) => ({
        ...nextState,
        [name]: checked,
      }));
      setErrors((nextState) => ({
        ...nextState,
        [name]: '',
      }));
    } else if (e.target.type == 'text') {
      if (name != 'OTP') {
        const question = questions.find((item) => item.id == name);
        const regex = new RegExp(question.regex);
        const test = regex.test(value);
        setState((nextState) => ({
          ...nextState,
          [name]: value,
        }));
        if (test == false) {
          setErrors((nextState) => ({
            ...nextState,
            [name]: question.warning,
          }));
        } else {
          setErrors((nextState) => ({
            ...nextState,
            [name]: '',
          }));
        }
      } else {
        setState((nextState) => ({
          ...nextState,
          [name]: value,
        }));
        setErrors((nextState) => ({
          ...nextState,
          [name]: '',
        }));
      }
    } else {
      setState((nextState) => ({
        ...nextState,
        [name]: value,
      }));
      setErrors((nextState) => ({
        ...nextState,
        [name]: '',
      }));
    }
  };
  const filledOrNot = (questions, state) => {
    const ans1 = questions.filter((item) => state.hasOwnProperty(item.id) && state[item.id] != false && state.question_type !== 'MESSAGE').length;
    const ans2 = questions.filter((item) => item.question_type !== 'MESSAGE').length;

    return ans1 == ans2;
  };

  return (
    <Pages
      route={props.route}
      title="Example Form"
      description="Form"
      images=""
      // images="/static/images/logo.png"
      keywords=""
      // login={props.handleLoginShow}
      // register={props.handleRegisterShow}
      titleName={'Example Form'}
    >
      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="form-title">Form Validate Example</h2>
          {/* <p>
            nextjs with sass initialization
            <i className="fal fa-heart" />
          </p> */}

          <section className="form-body">
            {questions
              .sort((a, b) => a.order_item - b.order_item)
              .map((type) => {
                if (type.question_type === 'MESSAGE') {
                  return (
                    <div className="form-input-container">
                      <div className="form-input">
                        <p className="form-message">{type.question_text}</p>
                      </div>
                    </div>
                  );
                }
                if (type.question_type === 'TEXT') {
                  return (
                    <div className="form-input-container">
                      <div className="form-input">
                        <label>{type.question_text}</label>
                        <input
                          type={type.question_type}
                          name={type.id}
                          className={`input-border ${errors.hasOwnProperty(type.id) && errors[type.id] != '' ? 'error' : ''}`}
                          placeholder={type.placeholder}
                          defaultValue={state[type.id]}
                          onChange={(e) => handlerChange(e, questions)}
                        />
                      </div>
                      {errors[type.id] != '' && <label className="form-error">{errors[type.id]}</label>}
                    </div>
                  );
                }
                if (type.question_type === 'IMAGE') {
                  return (
                    <div className="form-input-container">
                      <div className="form-input">
                        <label className="form-message">{type.question_text}</label>
                        <div className="group-zone">
                          {imagePreview[type?.id] != null ? (
                            <label htmlFor={type.id}>
                              <img height="150px" alt="preview img" src={imagePreview[type.id]} />
                            </label>
                          ) : (
                            <label htmlFor={type.id}>
                              <span>
                                <i className="fal fa-plus"></i>
                              </span>
                              <span>อัปโหลดรูป</span>
                            </label>
                          )}
                          <input accept="image/*" type="file" name={type.id} id={type.id} className="upload" onChange={(e) => handlerChange(e, questions)} />
                        </div>
                      </div>

                      {errors[type.id] != '' && <label className="form-error">{errors[type.id]}</label>}
                    </div>
                  );
                }
                if (type.question_type === 'CHECKBOX') {
                  return (
                    <div className="form-input-container">
                      <div className="form-input">
                        <label className="form-input-checkbox">
                          <input type="checkbox" defaultChecked={state[type.id]} name={type.id} onChange={(e) => handlerChange(e, questions)} />
                          <div className="form-message">{type.question_text}</div>
                        </label>
                        <span className="checkmark"></span>
                      </div>
                      {errors[type.id] != '' && <label className="form-error">{errors[type.id]}</label>}
                    </div>
                  );
                }
                if (type.question_type == 'RADIO') {
                  return (
                    <div className="form-input-container">
                      <div className="form-input">
                        <label className="title-radio">{type.question_text}</label>

                        {errors[type.id] != '' && <label className="form-error">{errors[type.id]}</label>}
                      </div>
                      <div className="form-input-radio" onChange={(e) => handlerChange(e, questions)}>
                        {type.choice.split(',').map((choices, i) => {
                          return (
                            <div key={i} className="form-input-radio ">
                              <label className="form-radio">
                                <input type="radio" name={type.id} value={choices} checked={state[type.id] === choices} defaultChecked={state[type.id]} />
                                <div className="form-message">{choices}</div>
                                <span className="checkmark radio"></span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            <div className="form-submit">
              <button
                className={`btn-submit ${filledOrNot(questions, state) ? 'btn-blue' : 'btn-gray'}`}
                onClick={() => {
                  handleSurvey(dataPV);
                }}
                disabled={!filledOrNot(questions, state) || stateS.loading}
              >
                SUBMIT
              </button>
              {/* <div className="btn_layout btn_cc" onClick={() => handleCloseSurvey()}>
                  {t('global:101020')}
                </div> */}
            </div>
          </section>
        </div>
      </div>
    </Pages>
  );
};

export default ExampleForm;

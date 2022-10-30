import React from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../context/ContextApiProvider";
import json from "../components/Inputs/inputs.json";
import { Col, Row } from "react-bootstrap";
import Sign from "../components/Sign/Sign";
class Info extends React.Component {
  static contextType = ApiContext;
  context!: React.ContextType<typeof ApiContext>;

  render(): React.ReactNode {
    return (
      <section className="min-90 p-0 p-md-5 d-flex flex-column py-5 align-items-center">
        <div className="w-100 d-flex align-items-center justify-content-start py-3 px-3 px-md-3">
          {json.map((icon, index) => {
            return (
              <Link
                key={index}
                onClick={this.context.getBack}
                style={{ textDecoration: "none" }}
                className={` ${this.context.theme.text} ${this.context.theme.elements} px-4 py-2 d-flex w-min justify-content-center align-items-center gap-1  border-none shadow rounded-1 `}
                to={"/"}
              >
                <img
                  width={15}
                  height={15}
                  src={
                    this.context.theme.colors
                      ? icon["back-icon-dark"]
                      : icon["back-icon-light"]
                  }
                  alt={icon["back-icon-dark"]}
                ></img>
                Back
              </Link>
            );
          })}
        </div>
        {this.context.currentCountry.map((country: any, index2) => {
          return (
            <Row key={index2} className="h-75 w-100">
              <Col
                xs={12}
                lg={6}
                className=" d-flex justify-content-center align-items-center"
              >
                <img
                  className="shadow w-100 "
                  src={country.flags.svg}
                  alt={country.name.common}
                  width="555"
                  height="auto"
                ></img>
              </Col>
              <Col xs={12} lg={6} className="d-flex my-3  align-items-center">
                <div className="d-flex flex-column justify-content-between w-100 h-100 m-0 p-0">
                  <div
                    className={` px-0  px-lg-3 py-lg-0 py-3 ${this.context.theme.text} w-100 h-100`}
                  >
                    <h4 className="nunito-800">{country.name.common}</h4>
                    <Row className="m-0 p-0  d-flex">
                      <Col
                        xs={12}
                        lg={6}
                        className="px-0 h-100  d-flex flex-column gap-4"
                      >
                        {/*  Native name */}

                        <div className="d-flex  flex-wrap gap-2">
                          <span className="nunito-600">Native Name:</span>

                          <span> {this.context.native[0]} </span>
                        </div>

                        {/*  Population */}

                        <div className="d-flex gap-2">
                          <span className="nunito-600">Population:</span>
                          <span>{country.population} </span>
                        </div>

                        {/*  Region */}

                        <div className="d-flex gap-2">
                          <span className="nunito-600">Region:</span>
                          <span>{country.region} </span>
                        </div>

                        {/*  Sub Region */}

                        <div className="d-flex gap-2">
                          <span className="nunito-600">Sub Region:</span>
                          <span>{country.subregion} </span>
                        </div>

                        {/*  Capital */}

                        <div className="d-flex gap-2">
                          <span className="nunito-600">Capital:</span>
                          <span>{country.capital} </span>
                        </div>
                      </Col>
                      <Col
                        xs={12}
                        lg={6}
                        className="px-0 py-4 py-lg-0 h-100 d-flex flex-column gap-4"
                      >
                        {/* Top Level Domain */}

                        <div className="d-flex gap-2">
                          <span className="nunito-600">Top Level Domain:</span>
                          <span>{country.tld} </span>
                        </div>

                        {/*  Currencies */}

                        <div className="d-flex flex-wrap gap-2">
                          <span className="nunito-600">Currencies:</span>
                          {this.context.currency.map((currency, index3) => {
                            return (
                              <>
                                {index3 > 0 ? (
                                  <span key={index3}> , {currency} </span>
                                ) : (
                                  <span key={index3}>{currency} </span>
                                )}
                              </>
                            );
                          })}
                        </div>

                        {/*  Languages */}

                        <div className="d-flex flex-wrap gap-2">
                          <span className="nunito-600">Languages:</span>
                          {this.context.languages.map((language, index4) => {
                            return (
                              <>
                                {index4 > 0 ? (
                                  <span key={index4}> , {language} </span>
                                ) : (
                                  <span key={index4}>{language} </span>
                                )}
                              </>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className=" px-0 py-3 px-lg-3 ">
                    {/*  Borders */}
                    <div className="d-flex gap-2 py-3 flex-wrap">
                      <span
                        className={`nunito-600 d-flex justify-content-center align-items-center ${this.context.theme.text}`}
                      >
                        Border Countries:
                      </span>
                      {country.borders !== undefined ? (
                        <>
                          {this.context.borders.map(
                            (border: { code: string; name: string }, index5) => {
                              return (
                                <div
                                  key={index5}
                                  className="d-flex  justify-content-center align-items-center"
                                >
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/countries/${border.code.toLowerCase()}`}
                                    className={`w-100 py-2 px-3 text-center ${this.context.theme.elements} ${this.context.theme.text} border-none shadow rounded-1 `}
                                    onClick={(e) =>
                                      this.context.handleSelection!(e)
                                    }
                                    id={border.code}
                                  >
                                    {border.name}
                                  </Link>
                                </div>
                              );
                            }
                          )}
                        </>
                      ) : (
                        <span className={this.context.theme.text}>None</span>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} className="py-3">
                <Sign />
              </Col>
            </Row>
          );
        })}
      </section>
    );
  }
}

export default Info;

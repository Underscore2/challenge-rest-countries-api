import React from "react";
import { Row,Col } from "react-bootstrap";
import { ApiContext } from "../../context/ContextApiProvider";
import json from "./inputs.json";

class Inputs extends React.Component {
  static contextType = ApiContext;
  context!: React.ContextType<typeof ApiContext>;
  render(): React.ReactNode {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-5 py-3 w-100 d-flex justify-content-between align-items-center"
      >
        <Row className="w-100 m-0 p-0 d-flex justify-content-between">
          <Col md={5} sm={12} className="mx-0 px-0">
            <label
              htmlFor="search w-100"
              className={`shadow ${
                this.context.theme.colors
                  ? "search-style-dark"
                  : "search-style-light"
              } d-flex align-items-center px-2 ${
                this.context.theme.elements
              }`}
            >
              {json.map((data, index) => {
                return (
                  <img
                    key={index}
                    width={18}
                    height={18}
                    src={
                      this.context.theme.colors
                        ? data["search-icon-dark"]
                        : data["search-icon-light"]
                    }
                    alt="search"
                  ></img>
                );
              })}
              <input
                type="text"
                name="search"
                id="search"
                onChange={(e) => this.context.handleInput(e)}
                placeholder="Search for a country..."
                value={this.context.inputText}
                className={`w-100 ${
                  this.context.theme.colors
                    ? "input-search-style-light"
                    : "input-search-style-dark"
                } py-2 px-3 ${this.context.theme.elements} ${
                  this.context.theme.text
                } `}
              />
            </label>
          </Col>
          <Col md={4} sm={12} className="my-4 my-md-0 mx-0 px-0 d-flex justify-content-md-end justify-content-start align-items-center">
            <label htmlFor=" w-100">
              <select
                id="filter"
                onChange={(e) => this.context.handleClick(e)}
                className={`${this.context.theme.elements} ${
                  this.context.theme.text
                } shadow filter-style ${
                  this.context.theme.colors
                    ? "search-style-dark"
                    : "search-style-light"
                } py-2 px-2`}
              >
                <option defaultValue="Default" hidden>
                  Filter by Region
                </option>
                <option value="Europe">Europe</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
            </label>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Inputs;

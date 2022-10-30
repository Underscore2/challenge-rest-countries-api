import React from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../../context/ContextApiProvider";

interface CardProps {
  name: string;
  image: string;
  population: number;
  capital: string;
  region: string;
  subRegion?: string;
  topLevelDomain?: string;
  currencies?: string;
  languages?: string;
  borders?: string;
  code: string;
  link: string;
}

class Card extends React.Component<CardProps> {
  static contextType = ApiContext;
  context!: React.ContextType<typeof ApiContext>;

  render(): React.ReactNode {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/countries/${this.props.link.toLowerCase()}`}
        id={this.props.code}
        onClick={(e) => this.context.handleSelection(e)}
        className={`card-style d-flex flex-column shadow ${this.context.theme.elements}`}
      >
        <img
          src={this.props.image}
          className="image-style h-50"
          width={250}
          height={175}
          alt="flag"
        ></img>
        <div className="h-50   p-2 px-3 d-flex flex-column justify-content-center gap-2  ">
          <h4
            className={`${this.context.theme.text} nunito-800 m-0 overflow-hidden`}
          >
            {this.props.name}
          </h4>
          <p className={` ${this.context.theme.text} m-0`}>
            <span className="nunito-600 m-0">Region: </span> {this.props.region}
          </p>
          <p className={`${this.context.theme.text} m-0`}>
            <span className="nunito-600 m-0">Capital: </span>{" "}
            {this.props.capital}
          </p>
          <p className={`${this.context.theme.text} m-0`}>
            {" "}
            <span className="nunito-600 m-0">Population: </span>{" "}
            {this.props.population}
          </p>
        </div>
      </Link>
    );
  }
}
export default Card;

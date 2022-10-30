import React from "react";
import Card from "../components/Card/Card";
import Inputs from "../components/Inputs/Inputs";
import { ApiContext } from "../context/ContextApiProvider";
import json from "../components/Inputs/inputs.json"
class List extends React.Component {
  componentDidMount(): void {
    this.setState({
      selection: this.context.countries,
    });
  }
  static contextType = ApiContext;
  context!: React.ContextType<typeof ApiContext>;

  render(): React.ReactNode {
    let countriesStats = this.context.selection;
    return (
      <div className={this.context.theme.background}>
       
        <Inputs />
        <div className="min-90 p-4 text-white d-flex flex-wrap gap-5 justify-content-around align-items-center">
          {countriesStats.map((country: any, index9) => {
            return (
              <Card
                key={index9}
                name={country.name.common}
                image={country.flags.png}
                region={country.region}
                population={country.population}
                capital={country.capital}
                code={country.cca2}
                link={country.cca3}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default List;

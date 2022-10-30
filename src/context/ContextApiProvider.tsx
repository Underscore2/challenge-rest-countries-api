import React from "react";
import axios from "axios";

interface ContextState {
  countries: string[];
  currentCountry: string[];
  selection: string[];
  native: string[];
  currency: string[];
  languages: string[];
  borders: bordersObject[];
  inputText:string,
  theme:{
    colors:boolean,
    background:string,
    elements:string,
    text:string,
    input:string
  }
}

interface bordersObject {
  name: string;
  code: string;
}

interface ContextProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

interface ContextAPIValue extends ContextState {
  loadResource: () => void;
  handleClick: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelection: (e: React.MouseEvent<HTMLElement>) => void;
  handleTheme:()=>void
  getBack:()=>void
}

const API_URL = "https://restcountries.com/v3.1/all";
export const ApiContext = React.createContext<ContextAPIValue>({
  countries: [],
  currentCountry: [],
  selection: [],
  native: [],
  currency: [],
  languages: [],
  borders: [],
  inputText:'',
  theme:{
    colors:false,
    background:"light-background",
    elements:"light-elements",
    text:"light-text",
    input:"light-input"
  },
  loadResource: () => null,
  handleClick: () => null,
  handleInput: () => null,
  handleSelection: () => null,
  handleTheme:()=>null,
  getBack:()=>null
});

class ContextApiProvider extends React.Component<ContextProps, ContextState> {
  state = {
    countries: [],
    currentCountry: [],
    selection: [],
    native: [],
    currency: [],
    languages: [],
    borders: [],
    inputText:'',
    theme: {
      colors:true,
      background:"dark-background",
      elements:"dark-elements",
      text:"dark-text",
      input:"dark-input"
    },
  };

  componentDidMount(): void {
    if(localStorage.getItem('countries')){
      this.setState({
        countries: JSON.parse(localStorage.getItem('countries')!),
        selection: JSON.parse(localStorage.getItem('countries')!),
      })
    }else{
      this.loadResource();
    }
  }

  componentDidUpdate(prevProps: Readonly<ContextProps>, prevState: Readonly<ContextState>, snapshot?: any): void {
    localStorage.setItem('countries',JSON.stringify(this.state.countries))
    if(prevState.theme.colors !== this.state.theme.colors){

      if(this.state.theme.colors){
        this.setState({
          theme:{
            colors:this.state.theme.colors,
            background:"dark-background",
            elements:"dark-elements",
            text:"dark-text",
            input:"dark-input"
          }
        })
      }else{
        this.setState({
          theme:{
            colors:this.state.theme.colors,
            background:"light-background",
            elements:"light-elements",
            text:"light-text",
            input:"dark-input"
          }
        })
      }
    }else{
     return 
    }
  }

  


  loadResource = () => {
    axios.get(API_URL).then((res) =>{     
      this.setState({
        countries: res.data,
        selection: res.data,
      })}
    )
  };

  handleClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    let region = event.target.value;

    let filterByRegion = [];

    filterByRegion = this.state.countries.filter(
      (country: { region: string }) => country.region === region
    );

    this.setState({
      selection: filterByRegion,
    });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let currentCountry = [];
    currentCountry = this.state.countries.filter(
      (country: { name: { common: string } }) =>
        country.name.common
          .toUpperCase()
          .includes(event.target.value.toUpperCase())
    );
    this.setState({
      selection: currentCountry,
      inputText: event.target.value
    });
  };

  handleSelection = (event: React.MouseEvent<HTMLElement>) => {
    let countryCode = event.currentTarget.id;
    const bla = new Promise((res, rej) => {
      res(
        this.setState({
          currentCountry: this.state.countries.filter(
            (country: { cca2: string }) => country.cca2 === countryCode
          ),
        })
      );
      rej((error: TypeError) => console.error(error.name));
    });

    bla.then((data) => this.objTranslator(this.state.currentCountry));
  };

  objTranslator = (obj: any) => {
    let [object] = obj;
    let nativeNameCountry: string[] = [];
    let currencyCountry: string[] = [];
    let languageCountry: string[] = [];
    let selectCountryBorder: bordersObject[] = [];

    // Native name
    for (const key in object.name.nativeName) {
      nativeNameCountry.push(object.name.nativeName[key].official);
    }

    // Currency

    for (const key in object.currencies) {
      currencyCountry.push(object.currencies[key].name);
    }

    // Language

    for (const key in object.languages) {
      languageCountry.push(object.languages[key]);
    }

    // Borders
    if (object.borders) {
      object.borders.map((borders: string) => {
        return this.state.countries.filter((countries: any) => {
          if (countries.cca3 === borders) {
            return selectCountryBorder.push({
              name: countries.name.common,
              code: countries.cca2,
            });
          } else {
            return null;
          } 
        });
      });
      this.setState({
        currency: currencyCountry,
        native: nativeNameCountry,
        languages: languageCountry,
        borders: selectCountryBorder,
      });
    } else {
      this.setState({
        currency: currencyCountry,
        native: nativeNameCountry,
        languages: languageCountry,
      });
    }
  };

  handleTheme = () => {
      this.setState({
        theme: {
          ...this.state.theme,
          colors:!this.state.theme.colors,
        }})
  };

  getBack=()=>{
    if(this.state.countries !== this.state.selection){

      this.setState({
        selection:this.state.countries,
        inputText:''
      })
    }
  }

  render() {
    const {
      countries,
      currentCountry,
      selection,
      native,
      currency,
      languages,
      borders,
      theme,
      inputText
    } = this.state;
    const { loadResource, handleClick, handleInput, handleSelection,handleTheme,getBack } = this;

    return (
      <ApiContext.Provider
        value={{
          countries,
          currentCountry,
          selection,
          native,
          currency,
          languages,
          borders,
          theme,
          inputText,
          loadResource,
          handleClick,
          handleInput,
          handleSelection,
          handleTheme,
          getBack
        }}
      >
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}

export default ContextApiProvider;

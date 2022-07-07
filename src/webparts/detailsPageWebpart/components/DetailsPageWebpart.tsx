import * as React from 'react';

import { IDetailsPageWebpartProps } from './IDetailsPageWebpartProps';
import { IDetailsPageWebpartState } from './IDetailsPageWebparState';
 
import ReactHtmlParser from 'react-html-parser';
import pnp from 'sp-pnp-js';

import './styles.css';

import { escape } from '@microsoft/sp-lodash-subset';
import { ClassItem } from '../models/ClassItem';

export default class DetailsPageWebpart extends React.Component<IDetailsPageWebpartProps, IDetailsPageWebpartState> {
  
  constructor(props: IDetailsPageWebpartProps) {
    super(props);

    this.state = {
      item : null,
      itemID : 0
    };
  }

  public componentDidMount(): void {
    // this.getURLDetails();

    // this.getListDetails();
  }

  private getURLDetails() {

  }

  public render(): React.ReactElement<IDetailsPageWebpartProps> {
    return (
      <main>
      {
      <section>
        <div className="page__container">
          <div className="tag__container">
            <div className="strip"></div>
            <div className="AAtag">Application Area</div>
            <div className="TAtag">Technology Area</div>
          </div>
          <div className="main__title">
            Title of the article 
          </div>
          <div className="main__content">
            Content of the article 
            {/* {ReactHtmlParser(this.state.content)} */}
          </div>
          <div className="footer__content">
            <p>Button here</p>
          </div>
        </div>
      </section>
      }
      </main>
    );
  }

  /* Controller Methods */
  private getListDetails(itemID) {
    pnp.sp.web.lists.getByTitle("Publication").items.getById(itemID).get().then
    ((Response) => {
      let newItem = new ClassItem(Response);
      this.setState({ item : newItem});
    })
  }
}

import * as React from 'react';

import { IDetailsPageWebpartProps } from './IDetailsPageWebpartProps';
import { IDetailsPageWebpartState } from './IDetailsPageWebparState';

import ReactHtmlParser from 'react-html-parser';
import pnp from 'sp-pnp-js';

import { useLocation } from "react-router-dom";

import './styles.css';

// import Button from 'react-bootstrap/Button';

import { ClassItem } from '../models/ClassItem';

import { escape } from '@microsoft/sp-lodash-subset';

export default class DetailsPageWebpart extends React.Component<IDetailsPageWebpartProps, IDetailsPageWebpartState> {

  constructor(props: IDetailsPageWebpartProps) {
    super(props);

    this.state = {
      title: "",
      content: "",
      AAtag: "",
      TAtag: "",
      itemID: 0
    };
  }

  public componentDidMount(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const idNumber = urlParams.get("itemid");
    console.log(idNumber);
    this.getListDetails(idNumber);

    this.forceUpdate();
  }

  public render(): React.ReactElement<IDetailsPageWebpartProps> {

    return (
      <main>
        {
          <section>
            <div className="page__container">
              <div className="tag__container">
                <div className="strip"></div>
                <div className="AAtag">{this.state.AAtag}</div>
                <div className="TAtag">{this.state.TAtag}</div>
              </div>
              <div className="page__content">
                <div className="main__title">
                  {this.state.title}
                </div>
                <div className="main__content">
                  {ReactHtmlParser(this.state.content)}
                </div>
                <div className="footer__content">
                  <a href="https://waion365.sharepoint.com/sites/MTR-GIPDEV" className="back__button">BACK TO LIST</a>
                </div>
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
        console.log(Response);
        let newItem = new ClassItem(Response);
        console.log(newItem);
        this.setState({
          title: newItem.Title,
          content: newItem.Content_EN
        });
        this.getAATagName(newItem.LOOKUPId);
        this.getTATagName(newItem.LOOKUP2Id);
      });
  }

  private getAATagName(tagID) {
    pnp.sp.web.lists.getByTitle("AATags").items.getById(tagID).get().then
      ((Response) => {
        this.setState({ AAtag: Response });
      });
  }

  private getTATagName(tagID) {
    pnp.sp.web.lists.getByTitle("TATags").items.getById(tagID).get().then
      ((Response) => {
        this.setState({ TAtag: Response });
      });
  }
}
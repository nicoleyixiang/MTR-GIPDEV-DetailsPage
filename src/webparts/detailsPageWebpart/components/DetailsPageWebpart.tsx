import * as React from 'react';
import { IDetailsPageWebpartProps } from './IDetailsPageWebpartProps';
import { IDetailsPageWebpartState } from './IDetailsPageWebparState';
import ReactHtmlParser from 'react-html-parser';
import pnp from 'sp-pnp-js';
import './styles.css';
import { ClassItem } from '../models/ClassItem';

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
          <div className="allitems">
            <div className="page__container">
              <div className="tag__banner">
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
                  <a href="javascript:history.back()" className="back__button">BACK TO LIST</a>
                </div>
              </div>
            </div>
          </div>
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
        this.getAATagName(newItem.ApplicationArea_ENId);
        this.getTATagName(newItem.RelatedTechnology_ENId);
      });
  }

  private getAATagName(tagID) {
    pnp.sp.web.lists.getByTitle('SystemParameter').items
    .filter("Title eq 'ApplicationArea' and 'Application")
    .getById(tagID)
    .get().then
      ((Response) => {
        console.log(Response);
        this.setState({ AAtag: Response.Value });
      });
  }

  private getTATagName(tagID) {
    pnp.sp.web.lists.getByTitle('SystemParameter').items
    .filter("Title eq 'RelatedTechnology'")
    .getById(tagID)
    .get().then
      ((Response) => {
        console.log(Response);
        this.setState({ TAtag: Response.Value });
      });
  }
}
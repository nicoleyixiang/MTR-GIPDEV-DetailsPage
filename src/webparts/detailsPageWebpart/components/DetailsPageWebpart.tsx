import * as React from 'react';
import { IDetailsPageWebpartProps } from './IDetailsPageWebpartProps';
import { IDetailsPageWebpartState } from './IDetailsPageWebparState';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
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
      itemID: 0,
      isChinese : false
    }; 
  }

  public componentDidMount(): void {
    // Retrieving information from QueryString parameters 
    const urlParams = new URLSearchParams(window.location.search);
    const idNumber = urlParams.get("itemid");
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
                  <RichText 
                  className="rich__text"
                  value={this.state.content}
                  isEditMode={false}
                  />
                </div>
                <div className="footer__content">
                  <a href="javascript:history.back()" className="back__button">{this.state.isChinese ? "返回" : "BACK"}</a>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
    );
  }

  // Retrieving items from the SP list 
  private getListDetails(itemID) {
    const url = window.location.href;
    if (url.search("/CH/") !== -1) {
      this.setState({ isChinese : true });
    }

    pnp.sp.web.lists.getByTitle("Publication").items.getById(itemID).get().then
      ((Response) => {

        if (this.state.isChinese) {
          this.setState({
            title : Response.Title_CH,
            content : Response.Content_CH
          })
        }
        else {
          this.setState({
            title: Response.Title,
            content: Response.Content_EN
          });
        }
        
        this.getAATagName(Response.ApplicationArea_ENId);
        this.getTATagName(Response.RelatedTechnology_ENId);
      });
  }

  // Get the names of the tags based on the tag ID 
  private getAATagName(tagID) {
    pnp.sp.web.lists.getByTitle('SystemParameter').items
    .filter("Title eq 'ApplicationArea'")
    .getById(tagID)
    .get().then
      ((Response) => {
        console.log(Response);
        const val = this.state.isChinese ? Response.Value_CH : Response.Value
        this.setState({ AAtag: val });
      });
  }

  private getTATagName(tagID) {
    pnp.sp.web.lists.getByTitle('SystemParameter').items
    .filter("Title eq 'RelatedTechnology'")
    .getById(tagID)
    .get().then
      ((Response) => {
        console.log(Response);
        const val = this.state.isChinese ? Response.Value_CH : Response.Value
        this.setState({ TAtag: val });
      });
  }
}
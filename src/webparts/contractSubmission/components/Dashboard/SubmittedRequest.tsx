import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { SelectionMode } from 'office-ui-fabric-react';
import { ListView, IViewField, IGrouping, GroupOrder } from '@pnp/spfx-controls-react';
import { IListItem } from './IListItem';
export interface SubmittedRequestProps{
    items:IListItem[];
    OpenEditForm: (action: string, item: IListItem,Mode:string) => void;
}


export default class SubmittedRequest extends React.Component<SubmittedRequestProps,{}> {
    constructor(props) {
    
        super(props);
        this.state = {
      
        }
    }
    
    public viewFields() { 
      const viewFields: IViewField[] = [
        {
          name: "",
          displayName: "",
          minWidth: 60,
          maxWidth: 60,
          render: (item: any) => {
          return <button type="button" className={styles.EditBtn} id="add-row" 
          onClick={() => this.props.OpenEditForm("EditMySubmission", item,"Edit")}
          >
            <i className="fa fa-pencil-square-o" title="Show Progress">
            </i></button>;
          }
  
        },
        {
          name: "",
          displayName: "",
          minWidth: 60,
          maxWidth: 60,
          render: (item: any) => {
            return <button type="button" className={styles.EditBtn} id="add-row" 
            onClick={() => this.props.OpenEditForm("ViewMySubmission", item,"Edit")}
            ><i className="fa fa-eye" title="Show Progress"></i></button>;
          }
  
        },
        {
          name: "Title",
          displayName: "Vendor Name",
          isResizable: false,
          sorting: true,
          minWidth: 0,
          maxWidth: 180,
        },
        {
          name: "ProjectName",
          displayName: "Project Name",
          isResizable: false,
          sorting: true,
          minWidth: 0,
          maxWidth: 180
        },
        {
          name: "BesaEntity",
          displayName: "Besa Entity",
          isResizable: false,
          sorting: true,
          minWidth: 0,
          maxWidth: 180
        },
        {
          name: "RequestID",
          displayName: "Request ID",
          isResizable: false,
          sorting: true,
          minWidth: 0,
          maxWidth: 180
        },
        {
          name: "AuthorTitle",
          displayName: "Submitted By",
          isResizable: false,
          sorting: true,
          minWidth: 0,
          maxWidth: 180,
          //render: (item: any) => item.Author ? item.Author.Title : ""
        }
      ];
      return viewFields;
    };

    public groupByFields() {
      const groupByFields: IGrouping[] = [
        {
          name: "Status",
          order: GroupOrder.ascending
        },];
      return groupByFields
    };
    setOpenEditDialog(value) {
    this.setState({ openEditDialog: value });
  }

    render() {
    return (
      <section className={`${styles.contractSubmission}`}>
        
                   <div className={styles.contractSubmission}>
  
                    <ListView
                    listClassName={styles.listViewStyle}
                    items={this.props.items}
                    viewFields={this.viewFields()}
                    groupByFields={this.groupByFields()}
                    compact={true}
                    selectionMode={SelectionMode.none}
                    showFilter={true}
                    filterPlaceHolder="Search..."
                    />
                    </div>
                   

      </section>
    );
  }
}

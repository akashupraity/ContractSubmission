import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
//import { Icon } from 'office-ui-fabric-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Icon } from 'office-ui-fabric-react';
//import 'font-awesome/css/font-awesome.min.css';

export interface MilestoneBasedProps {
  IProcurementModel: any[];
  Milestone_handleAddRow: () => void;
  Milestone_handleRemoveRow: (index: number) => void;
  Milestone_handleChange: (index: number, evt: any) => void;
  DisabledValue:boolean;
  idx:number;
  item:any
}

export default class MilestoneBased extends React.Component<MilestoneBasedProps> {
  render() {
    const { IProcurementModel,Milestone_handleChange, Milestone_handleRemoveRow } = this.props;

    return (
      <div>
       
            <div key={this.props.idx} className={styles.renderPeriodicallyTbl}>
              <div className="form-group col-md-5">
                {this.props.idx === 0 &&
                  <label className={styles.lblCtrl}>Description</label>}
            <input
              placeholder='Type Description'
              type="text"
              className='form-control'
              name="Description"
              value={this.props.item.Description}
              onChange={(e) => Milestone_handleChange(this.props.idx, e)}
              id={this.props.item.id}
              disabled={this.props.DisabledValue}
            />

              </div>

              <div className="form-group col-md-5">
                {this.props.idx === 0 &&
                  <label className={styles.lblCtrl}>Expected Date </label>}
            <input
              className='form-control'
              type="date"
              id={this.props.item.id}
              value={this.props.item.ExpectedDate}
              name="ExpectedDate"
              //disabled={this.state.DisabledValue}
              onChange={(e) => Milestone_handleChange(this.props.idx, e)}
              onKeyDown={(e) => e.preventDefault()}
              disabled={this.props.DisabledValue}
            />
              </div>

              <div className="form-group col-md-5">
                {this.props.idx === 0 && <label className="control-label">Amount USD</label>}

             <input
              placeholder='Amount(USD)'
              type="text"
              className='form-control'
              name="AmountUSD"
              value={this.props.item.AmountUSD}
              onChange={(e) => Milestone_handleChange(this.props.idx, e)}
              id={this.props.item.id}
              disabled={this.props.DisabledValue}
            />

              </div>

              {IProcurementModel.length > 1 && (
                <div className="form-group col-md-1">
                  <div onClick={() => Milestone_handleRemoveRow(this.props.idx)} className={styles.deleteIcon}>
                    <Icon iconName="delete" className="ms-IconExample" />
                  </div>
                </div>
              )}
            </div>
        

      </div>
    );
  }
}

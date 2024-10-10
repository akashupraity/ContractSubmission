import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { Icon } from 'office-ui-fabric-react';
import 'font-awesome/css/font-awesome.min.css';

export interface PeriodicallyProps {
  periodicallyModel: any[];
  handleAddRow: () => void;
  handleRemoveRow: (index: number) => void;
  handleChange: (index: number, evt: any) => void;
  periodOptions: any[];
  DisabledValue:boolean
  idx:number;
  item:any
}

export default class Periodically extends React.Component<PeriodicallyProps> {
  render() {
    const { periodicallyModel, handleChange, handleRemoveRow ,periodOptions} = this.props;

    var selectHeight = {
      color: 'black',
      'margin-top': '6px',
    };
    return (
      <div>
        
      
          <div key={this.props.idx} className={styles.renderPeriodicallyTbl}>
            <div className="form-group col-md-5">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>First Payment Date</label>}
              <input
                placeholder='Select First Payment Date..'
                className='form-control '
                type="date"
                id={this.props.item.id}
                name="FirstPaymentDate"
                value={this.props.item.FirstPaymentDate}
                onChange={(e) => handleChange(this.props.idx, e)}
                disabled={this.props.DisabledValue}
              />
            </div>

            <div className="form-group col-md-5">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>Amount (USD) </label>}
              <input
                placeholder='Type Description'
                type="text"
                className='form-control '
                name="AmountUSD"
                value={this.props.item.AmountUSD}
                onChange={(e) => handleChange(this.props.idx, e)}
                id={this.props.item.id}
                disabled={this.props.DisabledValue}
              />
            </div>

            <div className="form-group col-md-5">
              {this.props.idx === 0 && <label className="control-label">Period</label>}
              <select
                className='form-control'
                style={selectHeight}
                name="Period"
                value={this.props.item.Period}
                id={this.props.item.id}
                onChange={(e) => handleChange(this.props.idx, e)}
                disabled={this.props.DisabledValue}
              >
                <option value="">Select</option>
                {periodOptions.map((opt: any, index: any) => (
                  <option key={index} value={opt.key}>{opt.text}</option>
                ))}
                
              </select>
            </div>

            {periodicallyModel.length > 1 && (
              <div className="form-group col-md-1">
                <div onClick={() => handleRemoveRow(this.props.idx)} className={styles.deleteIcon}>
                  <Icon iconName="delete" 
                  className="ms-IconExample" />
                </div>
              </div>
            )}
          </div>
       
        
      </div>
    );
  }
}

import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { Icon } from 'office-ui-fabric-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'font-awesome/css/font-awesome.min.css';

export interface VariablePeriodicallyProps {
  VariablePeriodicallyModel: any[];
  _handleAddRowIVariablePeriodicallyModel: () => void;
  _handleRemoveSpecificRowIVariablePeriodicallyModel: (index: number) => void;
  _handleChangeVariablePeriodically: (index: number, evt: any) => void;
  periodOptions: any[];
  DisabledValue:boolean;
  idx:number;
  item:any
}

export default class VariablePeriodically extends React.Component<VariablePeriodicallyProps> {
  render() {
    const { VariablePeriodicallyModel, _handleChangeVariablePeriodically,_handleRemoveSpecificRowIVariablePeriodicallyModel, periodOptions } = this.props;

    var selectHeight = {
      color: 'black',
      'margin-top': '6px',
    };

    return (
      <div>
       
          <div key={this.props.idx} 
          className={styles.renderVariablePeriodicallyTbl}>
            <div className="form-group col-md-5">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>From Date</label>}
              <input
                placeholder='Select From Date..'
                className='form-control'
                type="date"
                id={this.props.item.id}
                name="FromDate"
                value={this.props.item.FromDate}
                onChange={(e) => _handleChangeVariablePeriodically(this.props.idx, e)}
                disabled={this.props.DisabledValue}
              />
            </div>
            <div className="form-group col-md-5">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>To Date</label>}
              <input
                placeholder='Select To Date..'
                className='form-control '
                type="date"
                id={this.props.item.id}
                name="ToDate"
                value={this.props.item.ToDate}
                onChange={(e) => _handleChangeVariablePeriodically(this.props.idx, e)}
                onKeyDown={(e) => e.preventDefault()}
                disabled={this.props.DisabledValue}
              />
            </div>

            <div className="form-group col-md-5">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>Amount (USD)  </label>}
              <input
                placeholder='Amount (USD) '
                type="text"
                className='form-control '
                name="AmountUSD"
                value={this.props.item.AmountUSD}
                onChange={(e) => _handleChangeVariablePeriodically(this.props.idx, e)}
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
                onChange={(e) => _handleChangeVariablePeriodically(this.props.idx, e)}
                disabled={this.props.DisabledValue}
              >
                <option value="">Select</option>
                {periodOptions.map((opt: any, index: any) => (
                  <option key={index} value={opt.key}>{opt.text}</option>
                ))}
              </select>
            </div>

            {VariablePeriodicallyModel.length > 1 && (
              <div className="form-group col-md-1">
                <div onClick={() => _handleRemoveSpecificRowIVariablePeriodicallyModel(this.props.idx)} className={styles.deleteIcon}>
                  <Icon iconName="delete" className="ms-IconExample" />
                </div>
              </div>
            )}
          </div>
      
        
      </div>
    );
  }
}

import * as React from 'react';
import styles from './ContractSubmission.module.scss';
import { IContractSubmissionProps } from './IContractSubmissionProps';
import MainFile from './Forms/MainFile';


export default class ContractSubmission extends React.Component<IContractSubmissionProps, {}> {
  public render(): React.ReactElement<IContractSubmissionProps> {
    return (
      <section className={`${styles.contractSubmission}`}>
        <MainFile 
        Context={this.props.Context} 
        siteURL={this.props.siteURL} 
        ListName={this.props.ListName} 
        PeriodicallyListName={this.props.PeriodicallyListName}
        MilestoneBasedListName={this.props.MilestoneBasedListName}
        ChildListName={this.props.ChildListName}
        ServerUrl={this.props.ServerUrl}
      />
        

      </section>
    );
  }
}

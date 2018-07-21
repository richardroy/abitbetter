import Lozenge from '../components/Lozenge';

export default class FilesChangedSummaryService {

  static commitFilesSummaryId = "commit-files-summary";

  static fileChangeSummaryBaseLozengeClass = "diff-summary-lozenge aui-lozenge aui-lozenge-subtle";
  static fileChangeSummaryLozengeCompleteClass = `aui-lozenge-complete`;
  static fileChangeSummaryLozengeDeletedClass = `aui-lozenge-error`;
  static fileChangeSummaryLozengeAddedClass = `aui-lozenge-success`;
  static fileChangeSummaryLozengeRenamedClass = `aui-lozenge-moved`;

  public static createFileSummaryLozenges() {
    const summary: any = this.getFileSummaryCount();
    const summaryElement = window.document.getElementById(this.commitFilesSummaryId);

    if(summary[`M`]) {
      const textContent = `${summary[`M`]} Modified`;
      const lozenge = Lozenge.createLozenge(textContent, this.fileChangeSummaryLozengeCompleteClass);
      summaryElement.parentElement.appendChild(lozenge);         
    }

    if (summary[`A`]) {
      const textContent = `${summary[`A`]} Added`;      
      const lozenge = Lozenge.createLozenge(textContent, this.fileChangeSummaryLozengeAddedClass);      
      summaryElement.parentElement.appendChild(lozenge);    
    }

    if (summary[`D`]) {
      const textContent = `${summary[`D`]} Deleted`;      
      const lozenge = Lozenge.createLozenge(textContent, this.fileChangeSummaryLozengeDeletedClass);      
      summaryElement.parentElement.appendChild(lozenge);
    }

    if (summary[`R`]) {
      const textContent = `${summary[`R`]} Renamed`;
      const lozenge = Lozenge.createLozenge(textContent, this.fileChangeSummaryLozengeRenamedClass);      
      summaryElement.parentElement.appendChild(lozenge);  
    }
  }

  private static getFileSummaryCount() {
    const fileSummaryLozenges = window.document.getElementsByClassName(this.fileChangeSummaryBaseLozengeClass);

    const summary: any = {};
    for(let i = 0; i < fileSummaryLozenges.length; i++) {
      const changeText = fileSummaryLozenges[i].textContent;
      //Removes whitespace
      const formattedChangeText = changeText.replace(/\W/g, ''); 
      const currentCount: number = summary[formattedChangeText];
      summary[changeText] = summary[changeText] ? currentCount + 1 : 1;
    }

    return summary;
  }
}
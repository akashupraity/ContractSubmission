/* eslint-disable */
//import { WebPartContext } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import { Site } from '@pnp/sp/presets/all';
import { IChildsItems } from '../Dashboard/IChildsItems';

const SP_DELVE_URL = '/_layouts/15/me.aspx/?p={0}&v=work';

const ensureStartsWith = (s: any, prefix: any) => {
  if (!s) return s;
  return s.indexOf(prefix) === 0 ? s : prefix + s;
};

export default class SPService {
    context: any;
    props: any;
    state: { file: any; };
    ServerUrl: any;
  public static getListData(
    listName: any,
    selectables: any,
    filterCondition: any,
    topItemCount: any,
    orderBy: any,
    ascending: any,
    expandStr: any
  ): Promise<any> {
    filterCondition =
      filterCondition !== null || orderBy !== undefined ? filterCondition : '';
    ascending =
      ascending !== null || ascending !== undefined ? ascending : true;
    orderBy = orderBy !== null || orderBy !== undefined ? orderBy : '';

    return sp.web.lists
      .getByTitle(listName)
      .items.select(selectables)
      .expand(expandStr)
      .filter(filterCondition)
      .top(topItemCount)
      .orderBy(orderBy, ascending)
      .getPaged();
  }

  public static getAllBatchItems = async (items: any, callback: any, allData : any[]) => {
    allData.push(...items.results);
    callback(allData);
    if (items.hasNext) {
      // To handle for out of VD network such mcas.ms as getNext doesn't get parent URL
      if (items.nextUrl.indexOf(window.location.origin) < 0) {
        items.nextUrl =
          window.location.origin +
          items.nextUrl.substr(
            items.nextUrl.indexOf('/sites'),
            items.nextUrl.length - 1
          );
      }
      return await items
        .getNext()
        .then((_items: any) => {
          return SPService.getAllBatchItems(_items, callback, allData);
        })
        .catch((error: any) => {
          console.log('Error occured in getting items ', error);
        });
    } else {
      return allData;
    }
  }

  public static async getAllListData(
    listName: any,
    selectables: any,
    pageSize: number,
    expandStr: any
  ): Promise<any> {

    return await sp.web.lists
      .getByTitle(listName).items
      .select(selectables)
      .expand(expandStr)
      .getAll(pageSize);
  }
  
  /** Get All Items from the list */
        public static async getAllParentsItems(listName: string): Promise<IChildsItems[]> {  
          return new Promise<IChildsItems[]>(async (resolve, reject) => {  
              try {   
                  let ParentsItems:IChildsItems[]=[];
                  sp.web.lists.getByTitle(listName).items.filter("Status eq 'Submitted'").select("*").getAll().then((results:any) => {  
                      results.map((item:any) => { +
                          ParentsItems.push({  
                              Title: item.Title,  
                              ProjectName: item.ProjectName,  
                              BesaEntity: item.BesaEntity,  
                              BesaOfficer:item.BesaOfficer,
                              Status:item.Status,
                              TransactionType:item.TransactionType,
                              RequestID:item.RequestID,
                              ID:item.ID
                          });  
                          
                      });  
                       
                         resolve(ParentsItems);  
                  });  
              }  
              catch (error) {  
                  console.log(error);  
              }  
          });  
      }

      public static async getAllChildsItems(listName: string): Promise<any[]> {  
        return new Promise<any[]>(async (resolve, reject) => {  
          sp.web.lists.getByTitle(listName).items.select("*").getAll()
                .then((results:any) => {  
                 resolve(results);  
                },
                (error:any)=>{
                    reject("error occured "+error);
                })
                
        });  
    }
    public static getChilds = function (item:any, items:any) {
      item.childs = [];
      items.map((childItem:any) =>{
          if (childItem.ParentIDId != undefined && parseInt(childItem.ParentIDId) == item.Id) {
              childItem.ParentsItemsDetails ==item.ParentDetails
              item.childs.push(childItem);
              this.getChilds(childItem, items);
          }
      });
    } 
  
  public static async postComments(
    listName: any,
    commentId: number,
    commentText: any
  ): Promise<any> {
    return await sp.web.lists
      .getByTitle(listName)
      .items.getById(commentId)
      .comments
      .add(commentText)


  }

  public static async getListPagedData(
    listName: any,
    selectables: any,
    filterCondition: any,
    topItemCount: any,
    orderBy: any,
    ascending: any,
    expandStr: any
  ): Promise<any> {
    filterCondition =
      filterCondition !== null || orderBy !== undefined ? filterCondition : '';
    ascending =
      ascending !== null || ascending !== undefined ? ascending : true;
    orderBy = orderBy !== null || orderBy !== undefined ? orderBy : '';

    return await sp.web.lists
      .getByTitle(listName)
      .items.select(selectables)
      .expand(expandStr)
      .filter(filterCondition)
      .top(topItemCount)
      .orderBy(orderBy, ascending)
      .getPaged();
  }

  public static getListItem(
    listName: any,
    selectables: any,
    expandebles: any,
    itemID: any
  ): Promise<any> {
    return sp.web.lists
      .getByTitle(listName)
      .items.getById(itemID)
      .select(selectables)
      .expand(expandebles)
      .get();
  }
  public static getListViews(
    listName: any   
  ): Promise<any> {
    return sp.web.lists
      .getByTitle(listName)
      .views();
     
  }
  //Save data in list without bachses---
  public static async saveListData(listName: any, jsonObj: any): Promise<any> {
    return new Promise<string>(async (resolve, reject)=>{
    await sp.web.lists.getByTitle(listName).items.add(jsonObj)
    .then((results:any)=>{
      resolve(results.data.ID);
  });
});

  }
  // * CreatListItem
// */
// public static async CreatePeriodically(IPeriodicallyModel: any[], RequestID: any): Promise<any> {
//   const listName = 'Periodically';

//   const jsonObjArr = IPeriodicallyModel.map((PeriodicallyModel: any) => {
//     return {
//       ContractId: RequestID,
//       FirstPaymentDate: PeriodicallyModel.FirstPaymentDate,
//       Title: PeriodicallyModel.AmountUSD,
//       Period: PeriodicallyModel.Period
//     };
//   });

//   return await Promise.all(
//     jsonObjArr.map((jsonObj: any) => {
//       return sp.web.lists.getByTitle(listName).items.add(jsonObj);
//     })
//   );
// }
  /**
     * update-UniqueID
     */
  public static UpdateUiniqueID(itemId:any,requestorUniqueID:any,ListName:any):Promise<string> {
    let updatePostDate = {
        RequestID: requestorUniqueID,
      }
    return new Promise<string>(async(resolve,reject)=>{
      sp.web.lists.getByTitle(ListName).items.getById(itemId).update(updatePostDate)
      .then((result:any)=>{
          resolve("Updated")
      },(error:any)=>{
          reject("error occured "+error);
      })
    })
};

public static UpdateItem(itemId:any,UpdateData:any){
  return new Promise<string>(async(resolve,reject)=>{
    sp.web.lists.getByTitle('Contract Management').items.getById(itemId).update(UpdateData)
      .then((result:any)=>{
          resolve(result.data.ID)
      },
      (error:any)=>{
          reject("error occured"+error)
      })
  })
}

public static ChildUpdateItem(itemId:any,UpdateData:any){
  return new Promise<string>(async(resolve,reject)=>{
    sp.web.lists.getByTitle('ContractManagementChilds').items.getById(itemId).update(UpdateData)
      .then((result:any)=>{
          resolve(result.data.ID)
      },
      (error:any)=>{
          reject("error occured"+error)
      })
  })
}

  public static getListItemVersions(
    listName: any,
    selectables: any,
    expandebles: any,
    itemID: any
  ): Promise<any> {
    return sp.web.lists
      .getByTitle(listName)
      .items.getById(itemID)
      .select(selectables)
      .expand(expandebles)
      .versions.get();
  }

  // public static getVersionForListItem(listName: string, listItemId: number, context:any, fields?: string[]): Promise<any[]> {
  //   let Url = context._pageContext._web.absoluteUrl;
  //   let versionHistory: any[] = [];
  //   try {
  //     return sp.web.lists.getByTitle(listName).get().then(listDetails => {
  //       console.log("listDetails: ", listDetails);
  //       let listId = listDetails["Id"];
  //       let url = `${Url}/_api/Web/Lists(guid'${listId}')/Items(${listItemId})/versions`;
  //       let headers = {
  //         'accept': 'application/json; odata=verbose'
  //       };
  //       return fetch(url, {
  //         headers: headers,
  //       }).then((res) => {
  //         return res.json();
  //       }).then((json) => {
  //         console.log("getVersionForItemUrl", json);
  //         let results = json.d && json.d.results ? json.d.results : [];
  //         versionHistory = results.length > 0 ? results.map(item => {
  //           let verObj = {
  //             VersionLabel: item.VersionLabel,
  //             IsCurrentVersion: item.IsCurrentVersion,
  //             VersionId: item.VersionId,
  //             //CreatedDate: moment(item.Created).format("MM/DD/YYYY hh:mm:ss A"),
  //             CreatedBy: item.Author && item.Author.Email && item.Author.LookupValue ? item.Author.LookupValue + "(" + item.Author.Email + ")" : "",
  //             // ModifiedDate: moment(item.Modified).format("MM/DD/YYYY hh:mm:ss A"),
  //             ModifiedBy: item.Editor && item.Editor.Email && item.Editor.LookupValue ? item.Editor.LookupValue + "(" + item.Editor.Email + ")" : "",
  //           };
  //           if (fields && fields.length > 0) {
  //             fields.forEach(elm => {
  //               verObj[elm] = item[elm];
  //             });
  //           }
  //           return verObj;
  //         }) : [];
  //         console.log("versionHistory", versionHistory);
  //         return versionHistory;
  //       }).catch(err => {
  //         console.log('fetch error - ', err);
  //         return err;
  //       });
  //     });
  //   } catch (err) {
  //     console.log('error - ', err);
  //     return err;
  //   }
  // }
  // public static getVersionHtml(listName: string, listItemId: number, context): Promise<string> {

  //   let Url = context._pageContext._web.absoluteUrl;
  //   try {
  //     return sp.web.lists.getByTitle(listName).get().then(listDetails => {
  //       console.log("listDetails: ", listDetails);
  //       let listId = listDetails["Id"];
  //       let url = `${Url}/_layouts/15/Versions.aspx?FileName=${Url}/Lists/${listName}/${listItemId}_.000&IsDlg=1&list={${listId}}`;
  //       let headers = {
  //         'accept': 'text/html; charset=UTF-8'
  //       };
  //       return fetch(url, {
  //         headers: headers,
  //       }).then((res) => {
  //         return res.text();
  //       }).then((htmlText) => {
  //         console.log("getVersionHtml", htmlText);
  //         return htmlText;
  //       }).catch(err => {
  //         console.log('fetch error - ', err);
  //         return err;
  //       });
  //     });
  //   } catch (err) {
  //     console.log('error - ', err);
  //     return err;
  //   }
  // }
  public static ensureUser(webUrl: any, currentUserEmail: any): Promise<any> {
    let site = Site(webUrl);
    return site.rootWeb.ensureUser(currentUserEmail);
  }

  public static getChoiceFieldValues(
    listName: string,
    fieldName: string
  ): Promise<any> {
    return sp.web.lists
      .getByTitle(listName)
      .fields.getByTitle(fieldName)
      .get();
  }

  public static async createFolder(libraryName: any, folderName: any) {
    await sp.web.folders.getByName(libraryName).folders.add(folderName);
  }

  public static async updateListData(
    listName: any,
    itemID: any,
    jsonObj: any
  ): Promise<any> {
    return await sp.web.lists
      .getByTitle(listName)
      .items.getById(itemID)
      .update(jsonObj);
  }
   // * Create Periodically Details
      // */
public static async UpdatePeriodicallyDetails(IModel:any,RequestID:any,ListName:any){
  await Promise.all(IModel.map((Model: any) => 
    sp.web.lists.getByTitle(ListName).items.getById(Model.id).update({     
          ContractId: RequestID,
          Title: Model.AmountUSD,
          FirstPaymentDate: Model.FirstPaymentDate != null ? new Date(Model.FirstPaymentDate) : null,
          Period: Model.Period
      })
  ));
  }
   // * Deete Periodically Details
      // */
public static async DeleteDynamicRowDetails(IModel:any,ListName:any){
  await Promise.all(IModel.map((Model: any) => 
    sp.web.lists.getByTitle(ListName).items.getById(Model.id).delete()
  ));
  }
  // * Create Milestone Details
      // */
public static async UpdateMilestoneDetails(IModel:any,RequestID:any,ListName:any){
  await Promise.all(IModel.map((Model: any) => 
    sp.web.lists.getByTitle(ListName).items.getById(Model.id).update({     
        ContractId:RequestID,
        Title:Model.Description,
        ExpectedDate:Model.ExpectedDate !=null?new Date(Model.ExpectedDate):null,
        AmountUSD:Model.AmountUSD
      })
  ));
  }

  // * Create Variable Periodically Details
      // */
public static async UpdateVariablePeriodicallyDetails(IModel:any,RequestID:any,ListName:any){
  await Promise.all(IModel.map((Model: any) => 
    sp.web.lists.getByTitle(ListName).items.getById(Model.id).update({     
        ContractId:RequestID,
        FromDate:Model.FromDate !=null?new Date(Model.FromDate):null,
        ToDate:Model.ToDate !=null?new Date(Model.ToDate):null,
        Title:Model.AmountUSD,
        Period:Model.Period
      })
  ));
  }

   /**
     * CreatListItem
     */
   public static CreateChildsListItem(PostChildData: any): Promise<string>{
    
    return new Promise<string>(async (resolve, reject)=>{
      sp.web.lists.getByTitle('ContractManagementChilds').items.add(PostChildData)
        .then((results:any)=>{
            resolve(results.data.ID);
        });
    });
}
  // * Create Obligation Details
      // */
public static async UpdateObligationDetails(IModel:any,RequestID:any,ListName:any){
  await Promise.all(IModel.map((Model: any) => 
    sp.web.lists.getByTitle(ListName).items.getById(Model.id).update({     
      ContractId:RequestID,
      Title:Model.Description,
      Date:Model.Date !=null?new Date(Model.Date):null,
      Frequency:Model.Frequency
      })
  ));
  }

   // * Create Obligation Details
      // */
public static async UpdateInsuranceDetails(IModel:any,RequestID:any,ListName:any){
  await Promise.all(IModel.map((Model: any) => 
    sp.web.lists.getByTitle(ListName).items.getById(Model.id).update({     
        ContractId:RequestID,
        Title:Model.Insurance,
        Comment:Model.Comment,
        Amount:Model.Amount
      })
  ));
  }

  public static async deleteListData(
    listName: any,
    itemID: any,

  ): Promise<any> {
    return await sp.web.lists
      .getByTitle(listName)
      .items.getById(itemID)
      .delete();
  }

  public static async saveListDataInBatch(
    listName: any,
    jsonObjArr: any
  ): Promise<any> {
    return await Promise.all(
      jsonObjArr.map((jsonObj: any) => {
        SPService.saveListData(listName, jsonObj);
      })
    );
  }

  public static async updateListDataInBatch(listName: any,jsonObjArr: any): Promise<any> {
    return await Promise.all(
      jsonObjArr.map((item: any) => {
        const Id = item.ItemID;
        delete item.ItemID;
        SPService.updateListData(listName, Id, item);
      })
    );
  }

  public static async saveListDataInBatchCreateUpdate(
    listName: any,
    jsonObjArr: any,
    Id,
    ObjectName?:string
  ): Promise<any> {
    let _apiRequestList = jsonObjArr.map((jsonObj: any, index: any) => {
      return new Promise((resolve, reject) => {
        if (jsonObj.Id == '0') {
          if(ObjectName && Id){
            jsonObj[`${ObjectName}`] = Id;
          }
          SPService.saveListData(listName, jsonObj).then(_data => {
            console.log('promise resolved', index, jsonObj);
            resolve(_data);
          }, _err => {
            console.log('promise failed', index, jsonObj);
            reject(_err)
          })
        }
        else {
          SPService.updateListData(listName, jsonObj.Id, jsonObj).then((data) => {
            resolve(data);
          }, (err) => {
            console.log('promise failed', index, jsonObj);
            reject(err)
          });
        }
      })

    });
    return await Promise.all(
      [..._apiRequestList]
    ).then(_data => {
      console.log('all promise resolved', _data);
      return _data;
    }, err => {
      console.log("error in batch upload", err);
      throw new Error(err);
      return err;
    })

  }

  public static async attachFilesToList(
    listName: any,
    itemId: any,
    fileInfos: any
  ): Promise<any> {
    return await sp.web.lists
      .getByTitle(listName)
      .items.getById(itemId)
      .attachmentFiles.addMultiple(fileInfos);
  }

  public static async addFiles(
    folderPath: any,
    fileName: any,
    fileAsArrayBuffer: any
  ): Promise<any> {
    return await sp.web
      .getFolderByServerRelativeUrl(folderPath)
      .files.add(fileName, fileAsArrayBuffer, true);
  }

  public static async getAllFiles(folderServerRelativeUrl: any): Promise<any> {
    return await sp.web
      .getFolderByServerRelativeUrl(folderServerRelativeUrl)
      .files.select('Name,ServerRelativeUrl,AuthorId')
      .expand('Author')
      .get();
  }
//* get Dynamic detail by lookup ID **/
public static GetDynamicDetails(itemId: any,listName:string):Promise<any> {
  return new Promise<any>(async(resolve,reject)=>{
    sp.web.lists.getByTitle(listName).items
    .select("*").filter(`ContractId eq `+itemId)
    .get()
    .then((results:any) => {
      resolve(results);
},(error:any)=>{
    reject("error occured "+error);
})
})
}; 

 // Get ListItem by Item ID
 public static GetLibraryDocumentForExcel(ContractItem:any):Promise<any>{

  try{
     // for(const TempIDArrs of TempIDArr ){
          return new Promise<any>(async(resolve,reject)=>{
            sp.web.lists.getByTitle('ContractManagementLibrary').items.filter(`ContractId eq `+ContractItem.ID).select("*","FileLeafRef","FileRef","EncodedAbsUrl","Author/Title","Author/ID","Author/EMail","Contract/ID","Contract/Title").expand("Author,Contract").orderBy("Id",false).get()
              .then(results => {
                  console.log(results);
                  resolve(results)

                  
              },(error:any)=>{
                  reject("error occured"+error);
              })
          })

     // }
  }catch (error) {
      console.log(`Error retrieving documents: ${error}`);
    }
  
  }
  // Get Files by Item ID
  public static GetLibraryDocument(itemId:any,ListName:string,SelectLablesforFiles,ExpandStrforFiles):Promise<any>{
    return new Promise<any>(async(resolve,reject)=>{
      await sp.web.lists.getByTitle(ListName).items.filter(`ContractId eq `+itemId)
        .select(SelectLablesforFiles)
        .expand(ExpandStrforFiles)
        .orderBy("Id",false)
        .get().then(results => {
            console.log(results);
            resolve(results)
        },(error:any)=>{
            reject("error occured"+error);
        })
    })
    
    }

  public static async deleteFile(fileServerRelativeUrl: any): Promise<any> {
    return await sp.web
      .getFileByServerRelativeUrl(fileServerRelativeUrl)
      .recycle();
  }
  public static async deleteAttachment(fileName: any,listName:any,id:any): Promise<any> {
    return await sp.web
    .lists.getByTitle(listName).items.getById(id).attachmentFiles.getByName(fileName).delete();
     
  }
  public static getUserProfiles() {
    return sp.web.currentUser.get().then(curUser => {
      if (curUser.LoginName) {
        return sp.profiles.getPropertiesFor(curUser.LoginName).then(profile => {
          // Properties are stored in inconvenient Key/Value pairs,
          // so parse into an object called userProperties
          if (
            profile.UserProfileProperties &&
            profile.UserProfileProperties.length > 0
          ) {
            var properties = { Id: curUser.Id };
            profile.UserProfileProperties.forEach(prop => {
              properties[prop.Key] = prop.Value;
            });
            profile.userProperties = properties;
          }
          return profile;
        });
      }
    });
  }

  public static getSpecificUserProfiles(loginName: any) {
    return sp.profiles.getPropertiesFor(loginName).then(profile => {
      // Properties are stored in inconvenient Key/Value pairs,
      // so parse into an object called userProperties
      if (
        profile.UserProfileProperties &&
        profile.UserProfileProperties.length > 0
      ) {
        var properties = { Id: profile.Id };
        profile.UserProfileProperties.forEach(prop => {
          properties[prop.Key] = prop.Value;
        });
        profile.userProperties = properties;
      }
      return profile;
    });
  }

  public static getUserByLoginName(loginName: any) {
    return sp.web.siteUsers.getByLoginName(loginName).get();
  }
  public static getUserByUserID(userID: any) {
    return sp.web.siteUsers.getById(userID).get();
  }

  public static getCurrentUserGroups() {
    return sp.web.currentUser.groups();
  }

  public static async breakInheritanceAndAssignPermission(
    folderPath: any,
    groupName: any
  ) {
    const folder = sp.web.getFolderByServerRelativePath(folderPath);
    const folderItem = await folder.getItem();

    await folderItem.breakRoleInheritance(false);

    // Get user/group proncipal Id
    const { Id: principalId } = await sp.web.currentUser.select('Id').get();
    // Get role definition Id
    const { Id: roleDefId } = await sp.web.roleDefinitions
      .getByName('Edit')
      .get();

    const { Id: groupPrincipalId } = await sp.web.siteGroups.getByName(
      groupName
    )();

    await folderItem.roleAssignments.add(principalId, roleDefId);
    await folderItem.roleAssignments.add(groupPrincipalId, roleDefId);
  }

  public static getAllGroupsByUserId(Id: number) {
    return sp.web.siteUsers.getById(Id).groups.get();
  }

  public static setDelveURLTriggerOnPplPicker() {
    setTimeout(() => {
      document.querySelectorAll('.ms-PickerItem-content').forEach(item => {
        const emailId = (item.querySelector('.ms-Persona-secondaryText')
          .firstChild as any).innerText;
        item.addEventListener('click', () => {
          if (emailId) {
            window.open(
              window.location.origin +
              ensureStartsWith(SP_DELVE_URL.replace('{0}', emailId), '/')
            );
          }
        });
      });
    }, 3000);
  }
}

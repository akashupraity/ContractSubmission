import SPService from "./SPServices";

export  default class Services{
    static  TeamMaster = {
    listName: "BesaEntity",
    selectables: [
        'Title'
    ],
    filterStr: "",
    itemCount: 5000,
    orderBy: "ID",
    isAscending: true,
    expandStr: "",
};
static ProjectName = {
    listName: "Project_Master",
    selectables: [
        'Title'
    ],
    filterStr: "",
    itemCount: 5000,
    orderBy: "ID",
    isAscending: true,
    expandStr: "",
};
static  CompanyMaster = {
    listName: "Company_Master",
    selectables: [
        'Title'
    ],
    filterStr: "",
    itemCount: 5000,
    orderBy: "ID",
    isAscending: true,
    expandStr: "",
};
static  ContractType = {
    listName: "ContractType",
    selectables: [
        'Title'
    ],
    filterStr: "",
    itemCount: 5000,
    orderBy: "ID",
    isAscending: true,
    expandStr: "",
};
static  ConfigurationList = {
    listName: "ConfigurationList",
    selectables: [
        'Payment_Type'
    ],
    filterStr: "",
    itemCount: 5000,
    orderBy: "ID",
    isAscending: true,
    expandStr: "",
};
static  ConfigurationListTransactionType = {
    listName: "ConfigurationList",
    selectables: [
        'TransactionType'
    ],
    filterStr: "",
    itemCount: 5000,
    orderBy: "ID",
    isAscending: true,
    expandStr: "",
};
static  ConfigurationListPeriod = {
    listName: "ConfigurationList",
    selectables: [
        'Period'
    ],
    filterStr: "",
    itemCount: 5000,
    orderBy: "ID",
    isAscending: true,
    expandStr: "",
};
public static getTeamMaster(showall?:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
        let _data = this.TeamMaster;
        SPService.getListData(_data.listName, _data.selectables, showall?"":_data.filterStr
            , _data.itemCount, _data.orderBy, _data.isAscending, _data.expandStr).then((data) => {
                
                resolve(data.results);
            }, (err) => {
                reject(err)
            });

    });
};

public static getProjectMaster(showall?:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
        let _data = this.ProjectName;
        SPService.getListData(_data.listName, _data.selectables, showall?"":_data.filterStr
            , _data.itemCount, _data.orderBy, _data.isAscending, _data.expandStr).then((data) => {
                
                resolve(data.results);
            }, (err) => {
                reject(err)
            });

    });
};

public static getCompanyMaster(showall?:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
        let _data = this.CompanyMaster;
        SPService.getListData(_data.listName, _data.selectables, showall?"":_data.filterStr
            , _data.itemCount, _data.orderBy, _data.isAscending, _data.expandStr).then((data) => {
                
                resolve(data.results);
            }, (err) => {
                reject(err)
            });

    });
};
public static getContractType(showall?:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
        let _data = this.ContractType;
        SPService.getListData(_data.listName, _data.selectables, showall?"":_data.filterStr
            , _data.itemCount, _data.orderBy, _data.isAscending, _data.expandStr).then((data) => {
                
                resolve(data.results);
            }, (err) => {
                reject(err)
            });

    });
};

public static getPaymentType(showall?:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
        let _data = this.ConfigurationList;
        SPService.getListData(_data.listName, _data.selectables, showall?"":_data.filterStr
            , _data.itemCount, _data.orderBy, _data.isAscending, _data.expandStr).then((data) => {
                
                resolve(data.results);
            }, (err) => {
                reject(err)
            });

    });
};
public static getTransactionType(showall?:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
        let _data = this.ConfigurationListTransactionType;
        SPService.getListData(_data.listName, _data.selectables, showall?"":_data.filterStr
            , _data.itemCount, _data.orderBy, _data.isAscending, _data.expandStr).then((data) => {
                
                resolve(data.results);
            }, (err) => {
                reject(err)
            });

    });
};

public static GetPeriod(showall?:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
        let _data = this.ConfigurationListPeriod;
        SPService.getListData(_data.listName, _data.selectables, showall?"":_data.filterStr
            , _data.itemCount, _data.orderBy, _data.isAscending, _data.expandStr).then((data) => {
                
                resolve(data.results);
            }, (err) => {
                reject(err)
            });

    });
}


}



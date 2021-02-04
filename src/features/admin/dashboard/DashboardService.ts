import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';
import { FilteredDefectNumbers, DatePeriodType, StatusType } from './DashboardModels';
import { getDefects } from '../defects/DefectsService';
import { User } from '../users/UsersModels';
import { ISnackbar } from '../../../common/components/Snackbar/snackbar';

export async function getUserByName(
    username: string | null,
    setSnack: React.Dispatch<React.SetStateAction<ISnackbar>>,
): Promise<User> {
    return await telegramApiAxios
        .get(`${environment.BASEURL}user/getByUsername/${username}`)
        .then((res) => {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch((err) => {
            setSnack({
                open: true,
                message: `На сервері сталась помилка - ${err}`,
                type: 'error',
            });
        });
}
export async function getDefectsNumbers(
    setSnack: React.Dispatch<React.SetStateAction<ISnackbar>>,
): Promise<FilteredDefectNumbers> {
    const AllDefectsArray = await getDefects().then((res) => res.defects);
    if (AllDefectsArray.length <= 0) {
        setSnack({
            open: true,
            message: `Дефекти відсутні`,
            type: 'info',
        });
        return {
            OpenDefectsCount: 0,
            ProccessDefectsCount: 0,
            ClosedDefectsCount: 0,
        };
    }
    let OpenDefectsCount = 0;
    let ProccessDefectsCount = 0;
    let ClosedDefectsCount = 0;

    for (let item of AllDefectsArray) {
        switch (item.status) {
            case 'open':
                OpenDefectsCount++;
                break;
            case 'fixing':
                ProccessDefectsCount++;
                break;
            case 'solved':
                ClosedDefectsCount++;
                break;
        }
    }
    return {
        OpenDefectsCount,
        ProccessDefectsCount,
        ClosedDefectsCount,
    };
}
export async function getDefectsByDateAndStatus(
    setSnack: React.Dispatch<React.SetStateAction<ISnackbar>>,
    status: StatusType,
    date: string,
): Promise<any> {
    return await telegramApiAxios
        .get(`${environment.BASEURL}defect/getByDateAndStatus`, {
            params: {
                status,
                date_type: 'open_date',
                start: date,
                end: new Date().toISOString().substr(0, 10),
            },
        })
        .then((res) => {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch((err) => {
            setSnack({
                open: true,
                message: `На сервері сталась помилка - ${err}`,
                type: 'error',
            });
        });
}
function FormatedDate(date) {
    return date.toISOString().substr(0, 10);
}
export function DefineDate(date_period: DatePeriodType): string {
    const Today = new Date();
    switch (date_period) {
        case 'yesterday':
            return FormatedDate(new Date(Today.setDate(Today.getDate() - 1)));
        case 'lastweek':
            return FormatedDate(new Date(Today.setDate(Today.getDate() - 7)));
        case 'lastmonth':
            return FormatedDate(new Date(Today.setDate(Today.getMonth() - 1)));
        default:
            return FormatedDate(new Date());
    }
}
export async function getDefectsNumberByDateAndStatus(
    setSnack: React.Dispatch<React.SetStateAction<ISnackbar>>,
    date_period: DatePeriodType,
): Promise<FilteredDefectNumbers | void> {
    let filterDate = DefineDate(date_period);
    let OpenDefectsCount = getDefectsByDateAndStatus(setSnack, 'open', filterDate);
    let ProccessDefectsCount = getDefectsByDateAndStatus(setSnack, 'fixing', filterDate);
    let ClosedDefectsCount = getDefectsByDateAndStatus(setSnack, 'solved', filterDate);
    const defects = Promise.all([OpenDefectsCount, ProccessDefectsCount, ClosedDefectsCount])
        .then((res) => {
            setSnack({
                open: true,
                message: `Дані успішно завантажені`,
                type: 'success',
            });
            return {
                OpenDefectsCount: res[0].defects.length,
                ProccessDefectsCount: res[1].defects.length,
                ClosedDefectsCount: res[2].defects.length,
            };
        })
        .catch((err) => {
            setSnack({
                open: true,
                message: `На сервері сталась помилка - ${err}`,
                type: 'error',
            });
        });
    switch (date_period) {
        case 'yesterday':
            return await defects;
        case 'lastweek':
            return await defects;
        case 'lastmonth':
            return await defects;

        default:
            return;
    }
}

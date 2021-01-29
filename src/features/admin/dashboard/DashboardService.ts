import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';
import { Data, FilteredDefectNumbers } from './DashboardModels';
import { Defect } from '../defects/DefectsModels';
import { getDefects } from '../defects/DefectsService';
import { User } from '../users/UsersModels';

export async function getUserByName(username: string | null, setSnack): Promise<User> {
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
export async function getDefectsNumbers(setSnack): Promise<FilteredDefectNumbers> {
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
export function CreateData(): any {
    return Data;
}

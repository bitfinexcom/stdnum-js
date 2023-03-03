import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
function clean(input) {
    return strings.cleanUnicode(input, '');
}
const impl = {
    name: 'Turkish Identificatio Number',
    localName: 'Türkiye Cumhuriyeti Kimlik Numarası',
    abbreviation: 'T.C. Kimlik No.',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        return value;
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (value.length !== 11) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!strings.isdigits(value) || value[0] === '0') {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        const [front, check] = strings.splitAt(value, -2);
        const sum1 = 10 -
            weightedSum(front, {
                weights: [3, 1],
                modulus: 10,
            });
        const sum2 = (sum1 +
            weightedSum(front, {
                weights: [1],
                modulus: 10,
            })) %
            10;
        if (`${sum1}${sum2}` !== check) {
            return { isValid: false, error: new exceptions.InvalidChecksum() };
        }
        return {
            isValid: true,
            compact: value,
            isIndividual: true,
            isCompany: false,
        };
    },
};
export const { name, localName, abbreviation, validate, format, compact } = impl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGNraW1saWsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHIvdGNraW1saWsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0EsT0FBTyxLQUFLLFVBQVUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHL0MsU0FBUyxLQUFLLENBQUMsS0FBYTtJQUMxQixPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxNQUFNLElBQUksR0FBYztJQUN0QixJQUFJLEVBQUUsOEJBQThCO0lBQ3BDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaEQsWUFBWSxFQUFFLGlCQUFpQjtJQUMvQixPQUFPLENBQUMsS0FBYTtRQUNuQixNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsQyxJQUFJLEdBQUcsRUFBRTtZQUNQLE1BQU0sR0FBRyxDQUFDO1NBQ1g7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBYTtRQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDbEM7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDO1NBQ2xFO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztTQUNsRTtRQUVELE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRCxNQUFNLElBQUksR0FDUixFQUFFO1lBQ0YsV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDakIsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDZixPQUFPLEVBQUUsRUFBRTthQUNaLENBQUMsQ0FBQztRQUNMLE1BQU0sSUFBSSxHQUNSLENBQUMsSUFBSTtZQUNILFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDWixPQUFPLEVBQUUsRUFBRTthQUNaLENBQUMsQ0FBQztZQUNMLEVBQUUsQ0FBQztRQUVMLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFFLEtBQUssS0FBSyxFQUFFO1lBQzlCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO1NBQ3BFO1FBRUQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEtBQUs7WUFDZCxZQUFZLEVBQUUsSUFBSTtZQUNsQixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQ3ZFLElBQUksQ0FBQyJ9
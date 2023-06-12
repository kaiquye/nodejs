import cron from 'node-cron';
import axios from 'axios';
import { AppDataSourceWriting } from '../../../infra/database/writing';
import { University } from '../../../domain/models/university.model';

const runForMinutes = '*/4 * * * *';
const runDay = '0 0 * * *';

cron.schedule(runForMinutes, async () => {
  console.time('save list of countries and for each country');
  try {
    const country = [
      'argentina',
      'brasil',
      'chile',
      'colombia',
      'paraguai',
      'peru',
      'suriname',
      'uruguai',
    ];
    const repository = AppDataSourceWriting.getRepository(University);

    // THIS IS NOT BATCH ENTRY
    for (const countryKey of country) {
      const { data } = await axios.get(
        `http://universities.hipolabs.com/search?country=${countryKey}`,
      );

      for (const university of data) {
        try {
          const created = await repository.create({
            countryCode: university.alpha_two_code,
            country: university.country,
            name: university.name,
            domain: university.domains,
            webPages: university.web_pages,
          });

          await repository.save(created);
        } catch (e) {}
      }
    }

    console.log('saved university by cron');
  } catch (e) {
    console.log('error saving university data', e);
  }
  console.timeEnd('save list of countries and for each country');
});

import { Button } from "@/components";
import { PlusHeroIcon } from "@/public/assets/icons";

export default function ButtonLibrary() {
  return (
    <div className="bg-slate-400 h-screen flex flex-col gap-10 pt-10">
      <div className="flex flex-row gap-5 justify-center">
        <Button label="tezt" variant="primary-white" size="xl" />
        <Button label="tezt" variant="primary-white" size="xl" loading={true} />
        <Button
          label="tezt"
          variant="primary-white"
          size="xl"
          leftIcon={<PlusHeroIcon className={'w-6'}/>}
        />
        <Button
          label="tezt"
          variant="primary-white"
          size="xl"
          rightIcon={<PlusHeroIcon className={'w-6'}/>}
        />
        <Button
          label="test"
          variant="primary-white"
          size="xl"
          rightIcon={<PlusHeroIcon className={'w-6'}/>}
          disabled={true}
        />
        <Button variant="primary-white" size="xl" rightIcon={<PlusHeroIcon className={'w-4'}/>} />

        <Button
          label="tezt"
          variant="primary-white"
          size="lg"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button variant="primary-white" size="lg" rightIcon={<PlusHeroIcon className={'w-4'}/>} />
        <Button
          label="tezt"
          variant="primary-white"
          size="sm"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button variant="primary-white" size="sm" rightIcon={<PlusHeroIcon className={'w-4'}/>} />
      </div>

      <div className="flex flex-row gap-5 justify-center">
        <Button label="tezt" variant="primary-dark" size="xl" />
        <Button label="tezt" variant="primary-dark" size="xl" loading={true} />
        <Button
          label="tezt"
          variant="primary-dark"
          size="xl"
          leftIcon={<PlusHeroIcon className={'w-6'}/>}
        />
        <Button
          label="tezt"
          variant="primary-dark"
          size="xl"
          rightIcon={<PlusHeroIcon className={'w-6'} />}
        />
        <Button
          label="test"
          variant="primary-dark"
          size="xl"
          rightIcon={<PlusHeroIcon  className={'w-6'}/>}
          disabled={true}
        />
        <Button variant="primary-dark" size="xl" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />

        <Button
          label="tezt"
          variant="primary-dark"
          size="lg"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button variant="primary-dark" size="lg" rightIcon={<PlusHeroIcon className={'w-4'}/>} />
        <Button
          label="tezt"
          variant="primary-dark"
          size="sm"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button variant="primary-dark" size="sm" rightIcon={<PlusHeroIcon className={'w-4'}/>} />
      </div>

      <div className="flex flex-row gap-5 justify-center p-5">
        <Button label="tezt" variant="secondary-dark" size="xl" />
        <Button label="tezt" variant="secondary-dark" size="xl" loading={true} />
        <Button
          label="tezt"
          variant="secondary-dark"
          size="xl"
          leftIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button
          label="tezt"
          variant="secondary-dark"
          size="xl"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button
          label="test"
          variant="secondary-dark"
          size="xl"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
          disabled={true}
        />
        <Button variant="secondary-dark" size="xl" rightIcon={<PlusHeroIcon className={'w-4'}/>} />

        <Button
          label="tezt"
          variant="secondary-dark"
          size="lg"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button variant="secondary-dark" size="lg" rightIcon={<PlusHeroIcon className={'w-4'}/>} />
        <Button
          label="tezt"
          variant="secondary-dark"
          size="sm"
          rightIcon={<PlusHeroIcon className={'w-4'}/>}
        />
        <Button variant="secondary-dark" size="sm" rightIcon={<PlusHeroIcon className={'w-4'}/>} />
      </div>

      <div className="flex flex-row gap-5 justify-center">
        <Button label="tezt" size="xl" />
        <Button label="tezt" size="xl" loading={true} />
        <Button label="tezt" size="xl" leftIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button label="tezt" size="xl" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button
          label="test"
          size="xl"
          rightIcon={<PlusHeroIcon  className={'w-4'}/>}
          disabled={true}
        />
        <Button size="xl" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />

        <Button label="tezt" size="lg" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button size="lg" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button label="tezt" size="sm" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button size="sm" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
      </div>

      <div className="flex flex-row gap-5 justify-center">
        <Button label="sfdsfe" size="xl" className="text-white font-5xl"/>
        <Button label="tezt" size="xl" loading={true} />
        <Button label="tezt" size="xl" leftIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button label="tezt" size="xl" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button
          label="test"
          size="xl"
          rightIcon={<PlusHeroIcon  className={'w-4'}/>}
          disabled={true}
        />
        <Button size="xl" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />

        <Button label="tezt" size="lg" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button size="lg" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button label="tezt" size="sm" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
        <Button size="sm" rightIcon={<PlusHeroIcon  className={'w-4'}/>} />
      </div>
    </div>
  );
}

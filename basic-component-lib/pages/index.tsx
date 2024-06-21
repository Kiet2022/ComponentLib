import { Button } from "@/components";
import { PlusHeroIcon } from "@/public/assets/icons";

export default function ButtonLibrary() {
  return (
    <div className="bg-slate-400 h-screen flex flex-col gap-10 pt-10">
      <div className="flex flex-row gap-5 justify-center">
        <Button label="tezt" variant="primary" theme="white" size="xl" />
        <Button
          label="tezt"
          variant="primary"
          theme="white"
          size="xl"
          leftIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          variant="primary"
          theme="white"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="test"
          variant="primary"
          theme="white"
          size="xl"
          rightIcon={<PlusHeroIcon />}
          disabled={true}
        />
        <Button
          variant="primary"
          theme="white"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />

        <Button
          label="tezt"
          variant="primary"
          theme="white"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          variant="primary"
          theme="white"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          variant="primary"
          theme="white"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          variant="primary"
          theme="white"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
      </div>

      <div className="flex flex-row gap-5 justify-center">
        <Button label="tezt" variant="primary" theme="dark" size="xl" />
        <Button
          label="tezt"
          variant="primary"
          theme="dark"
          size="xl"
          leftIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          variant="primary"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="test"
          variant="primary"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
          disabled={true}
        />
        <Button
          variant="primary"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />

        <Button
          label="tezt"
          variant="primary"
          theme="dark"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          variant="primary"
          theme="dark"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          variant="primary"
          theme="dark"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          variant="primary"
          theme="dark"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
      </div>

      <div className="flex flex-row gap-5 justify-center p-5">
        <Button label="tezt" variant="secondary" theme="dark" size="xl" />
        <Button
          label="tezt"
          variant="secondary"
          theme="dark"
          size="xl"
          leftIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          variant="secondary"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="test"
          variant="secondary"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
          disabled={true}
        />
        <Button
          variant="secondary"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />

        <Button
          label="tezt"
          variant="secondary"
          theme="dark"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          variant="secondary"
          theme="dark"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          variant="secondary"
          theme="dark"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          variant="secondary"
          theme="dark"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
      </div>

      <div className="flex flex-row gap-5 justify-center">
        <Button label="tezt" theme="dark" size="xl" />
        <Button
          label="tezt"
          theme="dark"
          size="xl"
          leftIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="test"
          theme="dark"
          size="xl"
          rightIcon={<PlusHeroIcon />}
          disabled={true}
        />
        <Button theme="dark" size="xl" rightIcon={<PlusHeroIcon />} />

        <Button
          label="tezt"
          theme="dark"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button theme="dark" size="lg" rightIcon={<PlusHeroIcon />} />
        <Button
          label="tezt"
          theme="dark"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
        <Button theme="dark" size="sm" rightIcon={<PlusHeroIcon />} />
      </div>

      <div className="flex flex-row gap-5 justify-center">
        <Button label="tezt" theme="white" size="xl" />
        <Button
          label="tezt"
          theme="white"
          size="xl"
          leftIcon={<PlusHeroIcon />}
        />
        <Button
          label="tezt"
          theme="white"
          size="xl"
          rightIcon={<PlusHeroIcon />}
        />
        <Button
          label="test"
          theme="white"
          size="xl"
          rightIcon={<PlusHeroIcon />}
          disabled={true}
        />
        <Button theme="white" size="xl" rightIcon={<PlusHeroIcon />} />

        <Button
          label="tezt"
          theme="white"
          size="lg"
          rightIcon={<PlusHeroIcon />}
        />
        <Button theme="dark" size="lg" rightIcon={<PlusHeroIcon />} />
        <Button
          label="tezt"
          theme="white"
          size="sm"
          rightIcon={<PlusHeroIcon />}
        />
        <Button theme="white" size="sm" rightIcon={<PlusHeroIcon />} />
      </div>
    </div>
  );
}

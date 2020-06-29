<?php


namespace App\Command;

use App\Entity\Evenement;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use phpDocumentor\Reflection\Location;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use SimpleXMLElement;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use \Doctrine\ORM\EntityManager;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Validator\Constraints\DateTime;

class fluxRssEvenementCommand extends Command
{
    /**
     *
     * Variable défini pour l'appel de la command
     *
     * @var string
     */
    protected static $defaultName = 'app:rssEvenement';

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * fluxRssEvenementCommand constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }


    /**
     * @CronJob("*\/5 * * * *")
     * Will be executed every 5 minutes
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int
     * @throws Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        /** Déclaration de l'entityManager */
        $doctrine = $this->entityManager;
        /** L'url du flux Rss */
        $urlEvenement = "https://www.terredevins.com/evenements/feed";
        /** Déclaration d'unenouvelle instance de la classe SimpleXMLElement */
        $xmlEvenement = new SimpleXMLElement($urlEvenement, null, true);
        /** Retourne les espaces de noms utilisés dans le document */
        $nsEvenement = $xmlEvenement->getNamespaces(true);
        /** Convertit  fichier XML en objet */
        $fluxrssEvenement = simplexml_load_file($urlEvenement);
        /** Déclaration d'une variable pour le chemin du flux Rss' */
        $itemsEvenement = $fluxrssEvenement->channel->item;

        /**
         * Boucle permettant de récupérés chaques items dans la variable
         */
        foreach($itemsEvenement as $item ){

            /**
             * Déclaration de chaques objets
             */
            $title = $item->title;
            $link = $item->link;
            $comments = $item->comments;
            $pubDate = $item->pubDate;
            $pubDateFinal = date('Y-m-d',strtotime($pubDate));
            $dc = $item->children($nsEvenement['dc']);
            $guid = $item->guid;
            $description = $item->description;
            $content = $item->children($nsEvenement['content']);
            $wfw = $item->children($nsEvenement['wfw']);
            $slash = $item->children($nsEvenement['slash']);
            $startdate = $item->children($nsEvenement['ev'])->children($nsEvenement['ev'])[0];
            $enddate = $item->children($nsEvenement['ev'])->children($nsEvenement['ev'])[1];
            $location = $item->children($nsEvenement['ev'])->children($nsEvenement['ev'])[2];
            $adress = $item->children($nsEvenement['ev'])->children($nsEvenement['ev'])[3];
            $zip = $item->children($nsEvenement['ev'])->children($nsEvenement['ev'])[4];
            $city = $item->children($nsEvenement['ev'])->children($nsEvenement['ev'])[5];
            /**
             * Variable permettant de voir si l'evenement existe ou pas.
             * retourne un booleen
             */
            $insertNewEvenement = $doctrine
                ->getRepository(Evenement::class)
                ->findEvenementByTitle($title->__toString());

            if (($insertNewEvenement === False)) {

                /**
                 * Nouvelle instance d'un Evenement
                 */
                $evenement = new Evenement();

                /**
                 * Ajout de chaque objet dans l'article
                 */
                $evenement->setTitle($title);
                $evenement->setLink($link);
                $evenement->setComments($comments);
                $evenement->setPubDate(new \DateTime($pubDateFinal));
                $evenement->setCreator($dc);
                $evenement->setGuid($guid);
                $evenement->setDescription($description);
                $evenement->setContent($content);
                $evenement->setCommentRss($wfw);
                $evenement->setCommentsSlash($slash);
                $evenement->setStartdate($startdate);
                $evenement->setEnddate($enddate);
                $evenement->setLocation($location);
                $evenement->setAdress($adress);
                $evenement->setZip($zip);
                $evenement->setCity($city);
                /**
                 * Persistence des données
                 */
                $doctrine->persist($evenement);

                /**
                 * Envoi des données sur la Bdd
                 */
                $doctrine->flush();
                $output->writeln('Récupération des Evénements !');
            }
        }
        return 0;
    }
}

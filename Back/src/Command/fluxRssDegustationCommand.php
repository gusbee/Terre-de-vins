<?php


namespace App\Command;

use App\Entity\Degustation;
use App\Entity\Category;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use SimpleXMLElement;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


/**
 *
 * Description de la Command de fluxRssDegustationCategory :
 *
 * Command qui gère la récupération du flux Rss des entity Degustation et Category.
 *
 * Class fluxRssDegustationCategoryCommand
 * @package App\Command
 */
class fluxRssDegustationCommand extends Command
{
    /**
     *
     * Variable défini pour l'appel de la command
     *
     * @var string
     */
    protected static $defaultName = 'app:rssDegustationCategory';

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * fluxRssDegustationCategoryCommand constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }


    /**
     *
     * Fonction d'éxecution de la command pour la récupération du FluxRss concernant Degustation et Category.
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return
     * @throws DBALException
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        /** Déclaration de l'entityManager */
        $doctrine = $this->entityManager;
        /** L'url du flux Rss */
        $urlHome = "https://www.terredevins.com/degustations/feed";
        /** Déclaration d'unenouvelle instance de la classe SimpleXMLElement */
        $xmlHome = new SimpleXMLElement($urlHome, null, true);
        /** Retourne les espaces de noms utilisés dans le document */
        $nsHome = $xmlHome->getNamespaces(true);
        /** Convertit  fichier XML en objet */
        $fluxRssHome = simplexml_load_file($urlHome);
        /** Déclaration d'une variable pour le chemin du flux Rss' */
        $itemsHome = $fluxRssHome->channel->item;

        /**
         * Boucle permettant de récupérés chaques items dans la variable
         */
        foreach($itemsHome as $item ) {

            /**
             * Déclaration de chaques objets
             */
            $title = $item->title;
            $link = $item->link;
            $comments = $item->comments;
            $pubDate = $item->pubDate;
            $pubDateFinal = date('Y-m-d', strtotime($pubDate));
            $dc = $item->children($nsHome['dc']);
            $categories = array();

            /**
             * Boucle permettant de récupérés chaques Category
             */
            foreach ($item->category as $category) {
                $categories[] = $doctrine
                    ->getRepository(Category::class)
                    ->findCategoryByName($category->__toString());
            }
            $guid = $item->guid;
            $description = $item->description;
            $content = $item->children($nsHome['content']);
            $wfw = $item->children($nsHome['wfw']);
            $slash = $item->children($nsHome['slash']);

            /**
             * Variable permettant de voir si la degustation existe ou pas.
             * retourne un booleen
             */
            $degustationUpdate = $doctrine
                ->getRepository(Degustation::class)
                ->findDegustationByTitle($title->__toString());

            /**
             * Insert les degustations non existants
             */
            if (($degustationUpdate === False)) {

                /**
                 * Nouvelle instance d'un Degustation
                 */
                $degustation = new Degustation();

                /**
                 * Ajout de chaque objet dans la degustation
                 */
                foreach ($categories as $category) {
                    $degustation->addCategory($category);
                }
                $degustation->setTitle($title);
                $degustation->setLink($link);
                $degustation->setComments($comments);
                $degustation->setPubDate(new \DateTime($pubDateFinal));
                $degustation->setCreator($dc);
                $degustation->setGuid($guid);
                $degustation->setDescription($description);
                $degustation->setContent($content);
                $degustation->setCommentRss($wfw);
                $degustation->setCommentsSlash($slash);

                /**
                 * Persistence des données
                 */
                $doctrine->persist($category);
                $doctrine->persist($degustation);

                /**
                 * Envoi des données sur la Bdd
                 */
                $doctrine->flush();
                $output->writeln('Récupération des Degustations et leurs Categories !');
            }
        }
        return 0;
    }
}
